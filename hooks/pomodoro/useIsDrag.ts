import { Dispatch, SetStateAction, useState } from 'react';

export default function useIsDrag(
  setIsExpanded: Dispatch<SetStateAction<boolean>>,
  setPosition: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >
) {
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragStop = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;

    if (dragStart) {
      const dx = clientX - dragStart.x;
      const dy = clientY - dragStart.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 드래그 거리가 일정 이상이면 클릭으로 인식하지 않도록!
      // 버블링 방지가 mouseEvent라 immediateStopPropagetion이 타입에 없다..🤔 any를 쓰긴 싫음.
      // 그냥 여기서 button클릭 외의 것만 인정하게 하자.
      const target = e.target as HTMLElement;
      if (distance <= 5 && target.tagName !== 'BUTTON') handleToggle();
      else setPosition({ x: clientX, y: clientY });
    }
  };

  const handleToggle = () => {
    setIsExpanded((prev: boolean) => !prev);
  };

  return { handleDragStart, handleDragStop };
}

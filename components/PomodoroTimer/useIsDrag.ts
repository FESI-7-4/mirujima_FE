import { useState } from 'react';

export default function useIsDrag(setIsExpanded, setPosition) {
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const handleDragStart = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleDragStop = (e: React.MouseEvent) => {
    if (dragStart) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 만약 드래그 거리가 일정 이상이면 클릭으로 인식하지 않도록
      if (distance <= 5) handleToggle(e);
      else
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    setIsExpanded((prev) => !prev);
  };

  return { handleDragStart, handleDragStop };
}

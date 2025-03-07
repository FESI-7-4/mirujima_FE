import useResize from '@/hooks/nav/useResize';
import { useEffect, useState } from 'react';

export default function usePosition() {
  const { screenSize } = useResize();
  const [position, setPosition] = useState({ x: screenSize.width - 100, y: 100 }); // Rnd의 위치 상태
  useEffect(() => {
    console.log('스크린사이즈 변경', screenSize, document.body.clientWidth, position);
    setPosition((prevPosition) => ({
      x: Math.min(document.body.clientWidth - 100, prevPosition.x), // 화면 크기보다 큰 위치를 제한
      y: Math.min(document.body.clientHeight - 100, prevPosition.y) // 화면 크기보다 큰 위치를 제한
    }));
  }, [screenSize]);

  useEffect(() => {
    console.log('포지션 변화', position);
  }, [position]);

  return { position, setPosition };
}

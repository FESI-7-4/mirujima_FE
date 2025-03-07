import { useEffect } from 'react';

export default function useScrollUpdate(
  goalListRef: React.RefObject<HTMLElement | null>,
  goals: any[]
) {
  useEffect(() => {
    const scrollToBottom = () => {
      if (goalListRef.current) {
        goalListRef.current.scrollTo({
          top: goalListRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    };

    const observerCallback = () => {
      const timeoutId = setTimeout(scrollToBottom, 50);

      return () => clearTimeout(timeoutId);
    };

    const observer = new MutationObserver(observerCallback);

    if (goalListRef.current)
      observer.observe(goalListRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [goals]);
}

import { useEffect, RefObject } from 'react';

export const useIntersectionObserver = (
  target: RefObject<HTMLElement>,
  callback: () => void,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    const currentObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    if (target.current) {
      currentObserver.observe(target.current);
    }

    return () => {
      if (target.current) {
        currentObserver.unobserve(target.current);
      }
    };
  }, []);
};

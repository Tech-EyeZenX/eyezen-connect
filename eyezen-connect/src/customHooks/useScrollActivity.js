import { useEffect, useState } from 'react';

export const useScrollActivity = (delay = 100) => {
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    let timeout;

    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, delay);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
    };
  }, [delay]);

  return isScrolling;
};

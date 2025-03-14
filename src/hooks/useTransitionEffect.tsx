
import { useState, useEffect } from 'react';

export const useTransitionEffect = (shouldAnimate = true, delay = 100) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (shouldAnimate) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [shouldAnimate, delay]);

  return isVisible;
};

export default useTransitionEffect;

// Libraries
import { useRef, useEffect } from 'react';

// usePrevious

const usePrevious = value => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;

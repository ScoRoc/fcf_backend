import React, { useCallback, useState } from 'react';

export default function useDimensions() {
  const [dimensions, setDimensions] = useState({});

  const ref = useCallback(node => {
    if (node !== null) {
      setDimensions(node.getBoundingClientRect());
    }
  }, []);

  return [ref, dimensions];
}

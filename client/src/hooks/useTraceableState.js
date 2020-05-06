// Libraries
import { useState } from 'react';
// Custom Hooks
import usePrevious from './usePrevious';

// useTraceableState

const useTraceableState = initialValue => {
  const [value, setValue] = useState(initialValue);
  const prevValue = usePrevious(value);
  return [value, setValue, prevValue];
};

export default useTraceableState;

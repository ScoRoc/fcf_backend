const comparisons = type => {
  const operators = {
    '===': x => y => y === x,
    '!==': x => y => y !== x,
    '>=': x => y => y >= x,
    '>': x => y => y > x,
    '<=': x => y => y <= x,
    '<': x => y => y < x,
  };
  return {
    isEqual: operators['==='],
    isNotEqual: operators['!=='],
    isGreaterThanOrEqual: operators['>='],
    isGreaterThan: operators['>'],
    isLessThanOrEqual: operators['<='],
    isLessThan: operators['<'],
  };
};

export const {
  isEqual,
  isNotEqual,
  isGreaterThanOrEqual,
  isGreaterThan,
  isLessThanOrEqual,
  isLessThan
} = comparisons();

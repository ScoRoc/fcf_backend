const sort = ({ arr, dir = 'asc', sortByKey }) => {
  return arr.sort((a, b) => {
    return dir === 'asc'
      ? a[sortByKey] === b[sortByKey]
        ? 0
        : a[sortByKey] < b[sortByKey]
        ? -1
        : 1
      : a[sortByKey] === b[sortByKey]
      ? 0
      : a[sortByKey] > b[sortByKey]
      ? -1
      : 1;
  });
};

module.exports = {
  sort,
};

export const getIndex = (findBy, arr, match) => {
  const value = match || findBy;
  return arr.indexOf(arr.find(item => item[findBy] === value));
};

export const addItemToStateArr = (item, prevState, arr) => {
  const withNewItem = prevState[arr].slice(0);
  withNewItem.push(item);
  return { [arr]: withNewItem };
};

export const removeItemFromStateArr = (item, prevState, arr) => {
  const withNewItem = prevState[arr].slice(0);
  withNewItem.splice(withNewItem.indexOf(item), 1);
  return { [arr]: withNewItem };
};

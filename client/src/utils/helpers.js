export const getIndex = (id, arr) => {
  return arr.indexOf(arr.find(item => item._id === id));
}

export const addItemToStateArr = (item, prevState, arr) => {
  const withNewItem = prevState[arr].slice(0);
  withNewItem.push(item);
  return { [arr]: withNewItem }
}

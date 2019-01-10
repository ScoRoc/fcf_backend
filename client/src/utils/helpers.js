export const getIndex = (id, arr) => {
  return arr.indexOf(arr.find(item => item._id === id));
}

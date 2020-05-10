const isDateObject = str => {
  return (
    typeof str.getMonth === 'function' && Object.prototype.toString.call(str) === '[object Date]'
  );
};

const isDateString = str => {
  const regEx = /^[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9]\.[0-9]{3}Z?$/g;
  return regEx.test(str);
};

module.exports = {
  isDateObject,
  isDateString,
};

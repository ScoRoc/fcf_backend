import moment from 'moment';

export const stringToMomentDate = str => moment(str);

export const mapDateStringToMomentObj = (toChange, keysArr) => {
  const arr = Array.isArray(toChange) ? toChange.slice(0) : [toChange];
  const firstKey = keysArr.length > 0 ? keysArr.splice(0, 1) : null;
  const newArr = arr.map(item => {
    return {
      ...item,
      [firstKey]: item[firstKey] !== null
                      ? stringToMomentDate( item[firstKey] )
                      : null,
    };
  });
  return keysArr.length > 0 ? mapDateStringToMomentObj(newArr, keysArr) : newArr;
}

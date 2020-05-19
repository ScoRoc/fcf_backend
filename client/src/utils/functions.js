const fakeAsyncCall = cb => async (time, props) => {
  return await new Promise(resolve =>
    setTimeout(() => {
      return resolve(typeof cb === 'function' ? cb(props) : cb);
    }, time),
  );
};

/* Example
const onClick = async () => {
  const getUsers = () => console.log('in the callback...');
  const start = fakeAsyncCall(getUsers);
  const response = await start(1000);
  response ? history.replace(FULL_PATHS.USERS) : console.log('error');
};
*/

export { fakeAsyncCall };

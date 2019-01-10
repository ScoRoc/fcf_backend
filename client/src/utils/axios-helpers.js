import axios from 'axios';

const useAxios = url => {
  const fixedUrl = (data, method) => axios({ url, data, method });
  return {
    deleteWithAxios: data => fixedUrl(data, 'delete'),
    editWithAxios: data => fixedUrl(data, 'put'),
  }
}

export default useAxios;

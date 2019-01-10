import axios from 'axios';

const useAxios = url => {
  const fixedUrl = (data, method) => axios({ url, data, method });
  return {
    deleteWithAxios: data => fixedUrl(data, 'delete'),
    putWithAxios: data => fixedUrl(data, 'put'),
    getWithAxios: () => fixedUrl(null, 'get'),
    postWithAxios: data => fixedUrl(data, 'post'),
  }
}

export default useAxios;

import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://10.0.2.2:58784/api/v1.0',
  //baseURL: 'http://biapi.trudata.com.br/api/v1.0',
  baseURL: 'http://devapi.trudata.com.br/api/v1.0',
});

export default api;

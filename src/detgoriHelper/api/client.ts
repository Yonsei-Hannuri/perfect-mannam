import axios from 'axios';
import getCookieValue from '../../modules/getCookieValue';

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/cowriter',
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const csrfToken = getCookieValue(document.cookie, 'csrftoken');
  config.headers['X-CSRFToken'] = csrfToken;
  return config;
});

export const essayClient = axios.create({
  ...client.defaults,
  baseURL: `${client.defaults.baseURL}/essay`,
});

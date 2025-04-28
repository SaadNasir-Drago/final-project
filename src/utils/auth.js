import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  return !!Cookies.get('token');
};

export const getToken = () => {
  return Cookies.get('token');
};

export const setToken = (token, options = {}) => {
  Cookies.set('token', token, options);
};

export const removeToken = () => {
  Cookies.remove('token');
};

export const TOKEN_KEY = "admin_token";
export const USER_KEY = "admin_userinfo";
const storage = window.localStorage;
export const setStorage = (key, value) => {
  storage.setItem(key, value);
};
export const getStorage = (key, value) => storage.getItem(key, value);
export const clearStorage = () => {
  storage.clear();
};
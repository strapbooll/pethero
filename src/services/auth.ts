export const TOKEN_KEY = "";
export const isAutheticate = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token: String) => {
  localStorage.setItem(TOKEN_KEY, String(token));
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
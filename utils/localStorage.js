export const windowLocalStorage = {
  set(key, values) {
    window.localStorage.setItem(key, JSON.stringify(values));
  },
  get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },
};

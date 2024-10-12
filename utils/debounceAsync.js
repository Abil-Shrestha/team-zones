export function debounceAsync(cb, wait) {
  let timeoutId = null;

  return async function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise(function (resolve, reject) {
      timeoutId = setTimeout(async function () {
        try {
          resolve(await cb(...args));
        } catch (error) {
          reject(error);
        }
      }, wait);
    });
  };
}

export const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const debounce = (callback, delay = 500) => {
  let timeoutId;
  return (...argumentsArray) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...argumentsArray), delay);
  };
};

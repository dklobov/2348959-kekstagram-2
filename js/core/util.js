export const DEBOUNCE_DELAY = 500;

export const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const debounce = (callback, delay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...argumentsArray) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...argumentsArray), delay);
  };
};

import { DEBOUNCE_DELAY } from './data.js';

export const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const debounce = (callback, delay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...argumentsArray) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...argumentsArray), delay);
  };
};
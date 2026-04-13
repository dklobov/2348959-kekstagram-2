import { isValid } from './validation.js';

const form = document.querySelector('.img-upload__form');

form.addEventListener('submit', (evt) => {
  if (!isValid()) {
    evt.preventDefault();
  }
});

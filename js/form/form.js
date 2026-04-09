import './validation.js';
import { isValid } from './validation.js';

const form = document.querySelector('.img-upload__form');
// const hashtagInput = form.querySelector('.text__hashtags');

form.addEventListener('submit', (evt) => {
  if (!isValid()) {
    evt.preventDefault();
  }
});

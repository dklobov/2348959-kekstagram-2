import {
  toggleModalVisibility,
  subscribeEsc,
  bindCloseButton
} from './modal-helper.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const closeButton = document.querySelector('.img-upload__cancel');

let unsubscribeEsc = null;

// функция закрытия модалки загрузки
const closeUploadModal = () => {
  toggleModalVisibility(imgUpload, false);

  if (unsubscribeEsc) {
    unsubscribeEsc();
    unsubscribeEsc = null;
  }
};

// функция открытия модалки загрузки
const openUploadModal = () => {
  toggleModalVisibility(imgUpload, true);
  unsubscribeEsc = subscribeEsc(imgUpload, closeUploadModal);
};

fileInput.addEventListener('change', openUploadModal);
bindCloseButton(closeButton, closeUploadModal);

// модалка загрузки фото (#upload-file, .img-upload__overlay)

import { createModalController } from '../widgets/modal-controller.js';
import { resetScale } from './upload-effects.js';
import { resetEffects } from './upload-filters.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const closeButton = document.querySelector('.img-upload__cancel');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectPreview = document.querySelectorAll('.effects__preview');

// создание контроллера модалки загрузки (открытие, закрытие, Esc и body)
const uploadModal = createModalController({
  modalElement: imgUpload,
  closeButton,
});

// обёртка для открытия модалки
const openUploadModal = () => {
  resetScale();
  resetEffects();
  uploadModal.open();
};

// fileInput.addEventListener('change', openUploadModal);
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  const imageUrl = URL.createObjectURL(file);

  imgPreview.src = imageUrl;
  effectPreview.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageUrl})`;
  });

  openUploadModal();
});

export const closeUploadModal = uploadModal.close;

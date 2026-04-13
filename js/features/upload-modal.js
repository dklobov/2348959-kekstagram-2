// модалка загрузки фото (#upload-file, .img-upload__overlay)

import { createModalController } from '../widgets/modal-controller.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const closeButton = document.querySelector('.img-upload__cancel');

// создание контроллера модалки загрузки (открытие, закрытие, Esc и body)
const uploadModal = createModalController({
  modalElement: imgUpload,
  closeButton,
});

// обёртка для открытия модалки
const openUploadModal = () => {
  uploadModal.open();
};

fileInput.addEventListener('change', openUploadModal);

export const closeUploadModal = uploadModal.close;

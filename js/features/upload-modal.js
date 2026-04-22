import { createModalController } from '../widgets/modal-controller.js';
import { resetFormState } from '../form/form-submit.js';
import { Messages } from '../widgets/messages.js';

const imgUploadElement = document.querySelector('.img-upload__overlay');
const fileInputElement = document.querySelector('#upload-file');
const imgPreviewElement = document.querySelector('.img-upload__preview img');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const effectPreviewElement = document.querySelectorAll('.effects__preview');
const inputDescriptionElement = document.querySelector('.text__description');
const inputHashtagElement = document.querySelector('.text__hashtags');

const defaultPreviewSrc = imgPreviewElement.src;

const canClose = () => document.activeElement !== inputHashtagElement
  && document.activeElement !== inputDescriptionElement
  && !document.querySelector(`.${Messages.ERROR}`);

const uploadModal = createModalController({
  modalElement: imgUploadElement,
  closeButton: closeButtonElement,
  canClose,
  closeModal: () => {
    resetFormState();
    fileInputElement.value = '';
    imgPreviewElement.src = defaultPreviewSrc;
    effectPreviewElement.forEach((preview) => {
      preview.style.backgroundImage = '';
    });
  }
});

const openUploadModal = uploadModal.open;

fileInputElement.addEventListener('change', () => {
  const file = fileInputElement.files[0];
  if (!file) {
    return;
  }
  const imageUrl = URL.createObjectURL(file);
  imgPreviewElement.src = imageUrl;
  effectPreviewElement.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageUrl})`;
  });

  openUploadModal();
});

export const closeUploadModal = uploadModal.close;

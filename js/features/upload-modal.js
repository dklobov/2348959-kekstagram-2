import { createModalController } from '../widgets/modal-controller.js';
import { resetFormState } from '../form/form-submit.js';
import { Messages } from '../core/data.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const imgPreview = document.querySelector('.img-upload__preview img');
const closeButton = document.querySelector('.img-upload__cancel');
const effectPreview = document.querySelectorAll('.effects__preview');
const inputDescription = document.querySelector('.text__description');
const inputHashtag = document.querySelector('.text__hashtags');

const canClose = () => document.activeElement !== inputHashtag
  && document.activeElement !== inputDescription
  && !document.querySelector(`.${Messages.ERROR}`);

const uploadModal = createModalController({
  modalElement: imgUpload,
  closeButton,
  canClose,
  closeModal: resetFormState
});

const openUploadModal = uploadModal.open;

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

import { sendForm } from '../core/api.js';
import { resetScale } from '../features/upload-scale.js';
import { resetEffects } from '../features/upload-effects.js';
import { closeUploadModal } from '../features/upload-modal.js';
import { Messages, showMessage } from '../widgets/messages.js';
import { isValid, resetValidation } from './validation.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const setSubmitButtonState = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

export const resetFormState = () => {
  uploadFormElement.reset();
  resetScale();
  resetEffects();
  resetValidation();
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (!isValid()) {
    return;
  }
  const formData = new FormData(uploadFormElement);

  try {
    setSubmitButtonState(true);
    await sendForm(formData);
    closeUploadModal();
    showMessage(Messages.SUCCESS);
  } catch (err) {
    showMessage(Messages.ERROR);
  } finally {
    setSubmitButtonState(false);
  }
};

uploadFormElement.addEventListener('submit', onFormSubmit);

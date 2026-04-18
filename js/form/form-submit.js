import { sendForm } from '../core/api.js';
import { Messages } from '../core/data.js';
import { showMessage} from '../widgets/messages.js';
import { resetScale } from '../features/upload-scale.js';
import { resetEffects } from '../features/upload-effects.js';
import { closeUploadModal } from '../features/upload-modal.js';
import { isValid, resetValidation } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const closeButton = document.querySelector('.img-upload__cancel');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const setSubmitButtonState = (isDisable) => {
  submitButton.disable = isDisable;
  submitButton.textContent = isDisable ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

export function resetFormState () {
  uploadForm.reset();
  resetScale();
  resetEffects();
  resetValidation();
};

closeButton.addEventListener('click', () => {
  closeUploadModal();
});

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (!isValid()) {
    return;
  }
  const formData = new FormData(uploadForm);

  try {
    setSubmitButtonState(true);
    await sendForm(formData);
    closeUploadModal();
    showMessage(Messages.SUCCESS);
  } catch (err) {
    console.error(err);
    showMessage(Messages.ERROR);
  } finally {
    setSubmitButtonState(false);
  }
};

uploadForm.addEventListener('submit', onFormSubmit);

import { isEscape } from '../core/util.js';

const body = document.body;

export const createModalController = ({
  modalElement,
  closeButton = null,
  openClass = 'modal-open',
  hiddenClass = 'hidden',
} = {}) => {
  let escHandler = null;

  const close = () => {
    body.classList.remove(openClass);
    modalElement.classList.add(hiddenClass);
    if(escHandler) {
      document.removeEventListener('keydown', escHandler);
      escHandler = null;
    }
  };

  const open = () => {
    body.classList.add(openClass);
    modalElement.classList.remove(hiddenClass);

    escHandler = (evt) => {
      if (!isEscape(evt)) {
        return;
      }
      if (modalElement.classList.contains(hiddenClass)) {
        return;
      }
      close();
    };

    document.addEventListener('keydown', escHandler);
  };

  if (closeButton) {
    closeButton.addEventListener('click', close);
  }

  return { open, close };
};

import { isEscape } from '../core/util.js';

const body = document.body;

export const createModalController = ({
  modalElement,
  openClass = 'modal-open',
  hiddenClass = 'hidden',
  canClose = null,
  closeModal = null
}) => {
  let escHandler = null;

  const close = () => {
    body.classList.remove(openClass);
    modalElement.classList.add(hiddenClass);
    if (closeModal) {
      closeModal();
    }
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
      if (canClose && !canClose()) {
        return;
      }
      if (modalElement.classList.contains(hiddenClass)) {
        return;
      }
      close();
    };

    document.addEventListener('keydown', escHandler);
  };

  return { open, close };
};

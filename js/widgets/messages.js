import { isEscape } from '../core/util.js';

let isModalMessageOpen = false;

const renderMessageFromTemplate = (templateId) => {
  const template = document.querySelector(`#${templateId}`);

  if (!template) {
    return null;
  }

  const messageFragment = template.textContent.cloneNode(true);
  const element = messageFragment.firstElementChild;

  document.body.append(element);

  return element;
};

export const showDataError = () => {
  const messageElement = renderMessageFromTemplate('data-error');

  if (!messageElement) {
    alert ('Не удалось загрузить данные');
    return;
  }

  setTimeout(() => {
    messageElement.remove();
  }, 5000);
};

сonst setClosableMessageHandlers = (messageElement, buttonSelector) => {
  const button = messageElement.querySelector(buttonSelector);

  isModalMessageOpen = true;

  const onButtonClick = () => close();

  const onDocumentClick = (evt) => {
    if (!messageElement.contains(evt.target)) {
      close();
    }
  };

  const onDocumentKeydown = (evt) => {
    if (isEscape(evt)) {
      close();
    }
  };

  function close() {
    messageElement.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    if (button) {
      button.removeEventListener('click', onButtonClick);
    }

    isModalMessageOpen = false;
  }

  if (button) {
    button.addEventListener('click', onButtonClick);
  }
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const showSuccesMessage = () => {
  if (isModalMessageOpen) {
    return;
  }

  const messageElement = renderMessageFromTemplate('success');
  if (!messageElement) {
    return;
  }

  setClosableMessageHandlers(messageElement, '.success_button');
};

export const showErrorMessage = () => {
  if (isModalMessageOpen) {
    return;
  }

  const messageElement =renderMessageFromTemplate('error');
  if (!messageElement) {
    return;
  }

  setClosableMessageHandlers(messageElement, '.error__button');
};

import { createModalController } from './modal-controller.js';

export const Messages = {
  SUCCESS: 'success',
  ERROR: 'error'
};

export const TIMEOUT_FIVESEC = 5000;

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.body;

const templates = {
  [Messages.SUCCESS]: successTemplateElement,
  [Messages.ERROR]: errorTemplateElement
};

const renderMessageFromTemplate = (templateId) => {
  const template = document.querySelector(`#${templateId}`);
  if (!template) {
    return null;
  }
  const messageFragment = template.content.cloneNode(true);
  const message = messageFragment.firstElementChild;
  document.body.append(message);
  return message;
};

export const showDataError = () => {
  const dataErrorMessage = renderMessageFromTemplate('data-error');
  if (!dataErrorMessage) {
    return;
  }
  setTimeout(() => dataErrorMessage.remove(), TIMEOUT_FIVESEC);
};

export const showMessage = (type) => {
  const message = templates[type].cloneNode(true);

  bodyElement.append(message);

  const actionsMessage = createModalController({
    modalElement: message,
    openClass: '',
    closeModal: () => message.remove()
  });
  actionsMessage.open();
  message.addEventListener('click', ({ target }) => {
    if (target.classList.contains(type) || target.classList.contains(`${type}__button`)) {
      actionsMessage.close();
    }
  });
};

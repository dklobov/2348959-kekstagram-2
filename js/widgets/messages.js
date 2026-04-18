import { TIMEOUT_FIVESEC, Messages } from '../core/data.js';
import { createModalController } from './modal-controller.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.body;

const templates = {
  [Messages.SUCCESS]: successTemplate,
  [Messages.ERROR]: errorTemplate
};

const renderMessageFromTemplate = (templateId) => {
  const template = document.querySelector(`#${templateId}`);
  if (!template) {
    return null;
  }
  const messageFragment = template.content.cloneNode(true);
  const element = messageFragment.firstElementChild;
  document.body.append(element);
  return element;
};

export const showDataError = () => {
  const messageElement = renderMessageFromTemplate('data-error');
  if (!messageElement) {
    console.error('Шаблон #data-error не найден в разметке');
    return;
  }
  setTimeout(() => messageElement.remove(), TIMEOUT_FIVESEC);
};

export const showMessage = (type) => {
  const message = templates[type].cloneNode(true);

  const actionsMessage = createModalController({
    modalElement: message,
    closeModal: () => message.remove()
  });
  actionsMessage.open();
  body.append(message);
  message.addEventListener('click', ({ target }) => {
    if (target.classList.contains(type) || target.classList.contains(`${type}__button`)) {
      actionsMessage.close();
    }
  });
};

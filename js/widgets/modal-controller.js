// универсальный контроллер модалки (open/close + Esc + body.modal-open)

import { isEscape } from '../core/util.js';

const body = document.body;

// фабрика контроллера модалки => на выходе отдаёт методы open/close
export const createModalController = ({
  modalElement,
  closeButton = null,
  openClass = 'modal-open',
  hiddenClass = 'hidden',
} = {}) => {
  // текущий обработчик Esc
  let escHandler = null;

  // закрытие модалки
  const close = () => {
    body.classList.remove(openClass);
    modalElement.classList.add(hiddenClass);
    if(escHandler) {
      document.removeEventListener('keydown', escHandler);
      escHandler = null;
    }
  };

  // открытие модалки
  const open = () => {
    body.classList.add(openClass);
    modalElement.classList.remove(hiddenClass);

    escHandler = (evt) => {
      if (!isEscape(evt)) {
        return;
      }
      // если модалка уже скрыта, не делаем ничего
      if (modalElement.classList.contains(hiddenClass)) {
        return;
      }
      close();
    };

    document.addEventListener('keydown', escHandler);
  };

  // если кнопка закрытия модалки передана, вешаем на неё обработчик close
  if (closeButton) {
    closeButton.addEventListener('click', close);
  }

  return { open, close };
};


// // показывает/скрывает конкретный модал + блокировка скролла
// const toggleModalVisibility = (modalElement, isVisible = true) => {
//   body.classList.toggle('modal-open', isVisible);
//   modalElement.classList.toggle('hidden', !isVisible);
// };

// // подписка на Esc, возвращает функцию для отписки
// const subscribeEsc = (modalElement, closeFunc) => {
//   const handler = (evt) => {
//     if (!isEscape(evt)) {
//       return;
//     }
//     // если модал скрыт, ничего не делаем
//     if (modalElement.classList.contains('hidden')) {
//       return;
//     }

//     closeFunc();
//   };

//   document.addEventListener('keydown', handler);

//   return () => {
//     document.removeEventListener('keydown', handler);
//   };
// };

// // привязка кнопки закрытия к функции закрытия
// const bindCloseButton = (buttonElement, closeFunc) => {
//   buttonElement.addEventListener('click', closeFunc);
// };

// export {
//   toggleModalVisibility,
//   subscribeEsc,
//   bindCloseButton
// };

import {
  toggleModalVisibility,
  subscribeEsc,
  bindCloseButton,
} from '../modal-helper.js';

const STEP_COMMENTS = 5; // шаг "дозагрузки" комментариев

// const body = document.body;
const modalPicture = document.querySelector('.big-picture');
const closeButton = modalPicture.querySelector('#picture-cancel');
const fullPicture = modalPicture.querySelector('.big-picture__img img');
const captionPicture = modalPicture.querySelector('.social__caption');
const likesPicture = modalPicture.querySelector('.likes-count');
const commentsShownCount = modalPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = modalPicture.querySelector('.social__comment-total-count');
const socialComments = modalPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const commentsLoader = modalPicture.querySelector('.comments-loader');

let currentComments = []; // комментарии конкретной открытой фотографии фото.comments
let shownComments = 0; // количество отрисованных комментариев в точке 0
let unsubscribeEsc = null; // функция-отписка от слушателя Esc для этой модалки


// // функция появления модалки + отключение скроллинга под ней
// const showModal = (isVisible = true) => {
//   if (isVisible) {
//     document.addEventListener('keydown', onDocumentKeydown);
//   } else {
//     document.removeEventListener('keydown', onDocumentKeydown);
//   }
//   modalPicture.classList.toggle('hidden', !isVisible);
//   body.classList.toggle('modal-open', isVisible);
// };

// // функция-обработчик клавиш
// function onDocumentKeydown(evt) {
//   if (isEscape(evt)) {
//     showModal(false);
//   }
// }

// // функция закрытия по клику
// const onCloseButtonClick = () => {
//   showModal(false);
// };

// // слушатель клика на кнопке закрытия модалки
// closeButton.addEventListener('click', onCloseButtonClick);


// функция закрытия модалки
const closePictureModal = () => {
  toggleModalVisibility(modalPicture, false);

  if (unsubscribeEsc) {
    unsubscribeEsc();
    unsubscribeEsc = null;
  }
};

// функция открытия модалки
const openPictureModal = () => {
  toggleModalVisibility(modalPicture, true);
  unsubscribeEsc = subscribeEsc(modalPicture, closePictureModal);
};

// отрисовка данных выбранной фотографии в модалке
const render = (picture) => {
  fullPicture.src = picture.url;
  captionPicture.textContent = picture.description;
  likesPicture.textContent = picture.likes;
  commentsTotalCount.textContent = picture.comments.length;
};

// отрисовка кнопки "Загрузить ещё"
const renderLoader = () => {
  commentsLoader.classList.toggle('hidden', shownComments >= currentComments.length);
};

// отрисовка порции из 5 комментариев
const renderCommentsPortion = () => {
  const nextCount = shownComments + STEP_COMMENTS;
  const portionFragment = document.createDocumentFragment();

  currentComments
    .slice(shownComments, nextCount)
    .forEach(({ avatar, message, name }) => {
      const li = socialCommentTemplate.cloneNode(true);
      const img = li.querySelector('.social__picture');
      const textComment = li.querySelector('.social__text');

      img.src = avatar;
      img.alt = name;
      textComment.textContent = message;

      portionFragment.append(li);
      shownComments++;
    });

  socialComments.append(portionFragment);
  commentsShownCount.textContent = shownComments;
  renderLoader();
};

// отрисовка массива комментариев для модалки
const renderComments = (comments) => {
  socialComments.innerHTML = '';
  currentComments = [...comments];
  shownComments = 0;

  renderCommentsPortion();
  // commentsLoader.classList.toggle('hidden', currentComments.length <= STEP_COMMENTS);
};

// обработчик клика кнопки "Загрузить ещё"
const onLoaderClick = () => {
  renderCommentsPortion();
};

commentsLoader.addEventListener('click', onLoaderClick);
bindCloseButton(closeButton, closePictureModal);

// открытие МОДАЛКИ + отрисовка ФОТО + отрисовка КОММЕНТОВ
export const openModal = (photo) => {
  openPictureModal();
  render(photo);
  renderComments(photo.comments);
};

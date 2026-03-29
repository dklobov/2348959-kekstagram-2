import { isEscape } from '../util.js';

const body = document.body;
const modalPicture = document.querySelector('.big-picture');
const closeButton = modalPicture.querySelector('#picture-cancel');
const fullPicture = document.querySelector('.big-picture__img img');
const captionPicture = document.querySelector('.social__caption');
const likesPicture = modalPicture.querySelector('.likes-count');
const сommentsShownCount = modalPicture.querySelector('.social__comment-shown-count');
const сommentsTotalCount = modalPicture.querySelector('.social__comment-total-count');
const socialComments = document.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const commentsLoader = modalPicture.querySelector('.comments-loader');
const STEP_COMMENTS = 5; // шаг "дозагрузки" комментариев
let currentComments = []; // комментарии конкретной открытой фотографии фото.comments
let shownComments = 0; // количество отрисованных комментариев в точке 0


// функция появления модалки + отключение скроллинга под ней
const showModal = (isVisible = true) => {
  if (isVisible) {
    document.addEventListener('keydown', onDocumentKeydown);
  } else {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
  modalPicture.classList.toggle('hidden', !isVisible);
  body.classList.toggle('modal-open', isVisible);
};

// функция-обработчик клавиш
function onDocumentKeydown (evt) {
  if (isEscape(evt)) {
    showModal(false);
  }
}

// функция закрытия по клику
const onCloseButtonClick = () => {
  showModal(false);
};

// слушатель клика на кнопке закрытия модалки
closeButton.addEventListener('click', onCloseButtonClick);

// отрисовка данных выбранной фотографии в модалке
const render = (picture) => {
  fullPicture.src = picture.url;
  captionPicture.textContent = picture.description;
  likesPicture.textContent = picture.likes;
  сommentsShownCount.textContent = 0;
  сommentsTotalCount.textContent = picture.comments.length;
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
    });

  socialComments.append(portionFragment);

  shownComments = Math.min(nextCount, currentComments.length);
  сommentsShownCount.textContent = shownComments;

  if (shownComments >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

// отрисовка массива комментариев для модалки
const comments = (commentsArray) => {
  socialComments.innerHTML = '';
  currentComments = commentsArray;
  shownComments = 0;

  commentsLoader.classList.toggle('hidden', currentComments.length <= STEP_COMMENTS);

  renderCommentsPortion();
};

commentsLoader.addEventListener('click', renderCommentsPortion);

export const openModal = (photo) => {
  showModal();
  render(photo);
  comments(photo.comments);
};

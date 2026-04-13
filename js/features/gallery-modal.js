// модалка большой фотки, комментарии, "Загрузить ещё"

import { createModalController } from '../widgets/modal-controller.js';

const STEP_COMMENTS = 5; // шаг "дозагрузки" комментариев

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

// создание контроллера модалки (открытие, закрытие, Esc, блок сркролла)
const pictureModal = createModalController({
  modalElement: modalPicture,
  closeButton,
});

// отрисовка данных выбранной фотографии в модалке
const renderPhoto = (picture) => {
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
};

// обработчик клика кнопки "Загрузить ещё"
const onLoaderClick = () => {
  renderCommentsPortion();
};

commentsLoader.addEventListener('click', onLoaderClick);

// открытие МОДАЛКИ + отрисовка ФОТО + отрисовка КОММЕНТОВ
export const openGalleryModal = (photo) => {
  renderPhoto(photo);
  renderComments(photo.comments);
  pictureModal.open();
};

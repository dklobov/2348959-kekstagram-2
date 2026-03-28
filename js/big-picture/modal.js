import { isEscape } from '../util.js';

const body = document.body;
const modalPicture = document.querySelector('.big-picture');
const closeButton = modalPicture.querySelector('#picture-cancel');
const fullPicture = document.querySelector('.big-picture__img img');
// const captionPicture = document.querySelector('.big-picture__social p');
const captionPicture = document.querySelector('.social__caption');
const likesPicture = modalPicture.querySelector('.likes-count');
const shownCommentsPicture = modalPicture.querySelector('.social__comment-shown-count');
const totalCommentsPicture = modalPicture.querySelector('.social__comment-total-count');
const socialCommentsCount = modalPicture.querySelector('.social__comment-count');
const socialComments = document.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');


// функция появления модалки + отключение скроллинга под ней
const showModal = (isVisible = true) => {
  if (isVisible) {
    document.addEventListener('keydown', onDocumentKeydown);
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
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
  shownCommentsPicture.textContent = picture.comments.length;
  totalCommentsPicture.textContent = picture.comments.length; /* порнография */
};

// отрисовка массива комментариев для модалки
const comments = (commentsArray) => {
  socialComments.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  commentsArray.forEach(({ avatar, message, name }) => {
    const li = socialCommentTemplate.cloneNode(true);
    const img = li.querySelector('.social__picture');
    const textComment = li.querySelector('.social__text');

    img.src = avatar;
    img.alt = name;
    textComment.textContent = message;

    commentsFragment.append(li);
  });
  socialComments.append(commentsFragment);
};

// const publishedComments = picture.comments.map(({ avatar, message }) => (
//   {avatar, message}));

// const publishedComments = (picture) => {

// publishedComments.forEach(({avatar, message}) => {
//   const li = document.createElement('li');
//   li.classList.add('social__comment');
//   li.innerHTML = `
//   <img class="social__picture" src="${avatar}" alt="Аватар комментатора фотографии" width="35" height="35">
//   <p class="social__text">${message}</p>
// `;
//   socialComments.append(li);
// });
// };

export const openModal = (photo) => {
  showModal();
  render(photo);
  comments(photo.comments);
};

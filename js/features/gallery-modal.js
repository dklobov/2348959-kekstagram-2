import { createModalController } from '../widgets/modal-controller.js';

const STEP_COMMENTS = 5;

const modalPictureElement = document.querySelector('.big-picture');
const closeButtonElement = modalPictureElement.querySelector('#picture-cancel');
const fullPictureElement = modalPictureElement.querySelector('.big-picture__img img');
const likesPictureElement = modalPictureElement.querySelector('.likes-count');
const captionPictureElement = modalPictureElement.querySelector('.social__caption');
const socialCommentsElement = modalPictureElement.querySelector('.social__comments');
const commentsLoaderElement = modalPictureElement.querySelector('.comments-loader');
const commentsShownCountElement = modalPictureElement.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = modalPictureElement.querySelector('.social__comment-total-count');
const socialCommentTemplateElement = socialCommentsElement.querySelector('.social__comment');

let currentComments = [];
let shownComments = 0;

const pictureModal = createModalController({
  modalElement: modalPictureElement,
  closeButton: closeButtonElement,
});

const renderPhoto = (picture) => {
  fullPictureElement.src = picture.url;
  likesPictureElement.textContent = picture.likes;
  captionPictureElement.textContent = picture.description;
  commentsTotalCountElement.textContent = picture.comments.length;
};

const renderLoader = () => {
  commentsLoaderElement.classList.toggle('hidden', shownComments >= currentComments.length);
};

const renderCommentsPortion = () => {
  const nextCount = shownComments + STEP_COMMENTS;
  const portionFragment = document.createDocumentFragment();

  currentComments
    .slice(shownComments, nextCount)
    .forEach(({ avatar, message, name }) => {
      const li = socialCommentTemplateElement.cloneNode(true);
      const img = li.querySelector('.social__picture');
      const textComment = li.querySelector('.social__text');

      img.src = avatar;
      img.alt = name;
      textComment.textContent = message;

      portionFragment.append(li);
      shownComments++;
    });

  socialCommentsElement.append(portionFragment);
  commentsShownCountElement.textContent = shownComments;
  renderLoader();
};

const renderComments = (comments) => {
  socialCommentsElement.innerHTML = '';
  currentComments = [...comments];
  shownComments = 0;

  renderCommentsPortion();
};

const onLoaderClick = () => renderCommentsPortion();

commentsLoaderElement.addEventListener('click', onLoaderClick);

export const openGalleryModal = (photo) => {
  renderPhoto(photo);
  renderComments(photo.comments);
  pictureModal.open();
};

closeButtonElement.addEventListener('click', () => {
  pictureModal.close();
});

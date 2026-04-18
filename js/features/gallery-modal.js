import { createModalController } from '../widgets/modal-controller.js';

const STEP_COMMENTS = 5;

const modalPicture = document.querySelector('.big-picture');
const closeButton = modalPicture.querySelector('#picture-cancel');
const fullPicture = modalPicture.querySelector('.big-picture__img img');
const likesPicture = modalPicture.querySelector('.likes-count');
const captionPicture = modalPicture.querySelector('.social__caption');
const socialComments = modalPicture.querySelector('.social__comments');
const commentsLoader = modalPicture.querySelector('.comments-loader');
const commentsShownCount = modalPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = modalPicture.querySelector('.social__comment-total-count');
const socialCommentTemplate = socialComments.querySelector('.social__comment');

let currentComments = [];
let shownComments = 0;

const pictureModal = createModalController({
  modalElement: modalPicture,
  closeButton,
});

const renderPhoto = (picture) => {
  fullPicture.src = picture.url;
  likesPicture.textContent = picture.likes;
  captionPicture.textContent = picture.description;
  commentsTotalCount.textContent = picture.comments.length;
};

const renderLoader = () => {
  commentsLoader.classList.toggle('hidden', shownComments >= currentComments.length);
};

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

const renderComments = (comments) => {
  socialComments.innerHTML = '';
  currentComments = [...comments];
  shownComments = 0;

  renderCommentsPortion();
};

const onLoaderClick = () => renderCommentsPortion();

commentsLoader.addEventListener('click', onLoaderClick);

export const openGalleryModal = (photo) => {
  renderPhoto(photo);
  renderComments(photo.comments);
  pictureModal.open();
};

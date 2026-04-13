// отрисовка превьюшек в .pictures

import { picturesContainer } from './gallery-init.js';

const onePhotoTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

export const renderPhotos = (photos) => {
  const compiledPhotoCards = document.createDocumentFragment();

  photos.forEach((photo) => {
    const onePhoto = onePhotoTemplate.cloneNode(true);
    const cardImg = onePhoto.querySelector('.picture__img');
    const cardLikes = onePhoto.querySelector('.picture__likes');
    const cardComments = onePhoto.querySelector('.picture__comments');

    cardImg.src = photo.url;
    cardImg.alt = photo.description;
    cardComments.textContent = photo.comments.length;
    cardLikes.textContent = photo.likes;

    onePhoto.dataset.id = photo.id;

    compiledPhotoCards.append(onePhoto);
  });

  picturesContainer.append(compiledPhotoCards);
};

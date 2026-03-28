import { openModal } from './modal.js';

export const picturesContainer = document.querySelector('.pictures');

let localPhotos;

export const initModal = (photos) => {
  localPhotos = [...photos];
};

picturesContainer.addEventListener('click', (evt) => {
  const thumbnailPicture = evt.target.closest('.picture');
  if(thumbnailPicture) {
    const id = Number(thumbnailPicture.dataset.id);

    const chosenPhoto = localPhotos.find((item) => item.id === id);

    openModal(chosenPhoto);
  }
});

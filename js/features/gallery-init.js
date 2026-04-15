import { openGalleryModal } from './gallery-modal.js';

export const picturesContainer = document.querySelector('.pictures');

let localPhotos;

export const initGalleryModal = (photos) => {
  localPhotos = [...photos];
};

picturesContainer.addEventListener('click', (evt) => {
  const thumbnailPicture = evt.target.closest('.picture');

  if(!thumbnailPicture) {
    return;
  }

  const id = Number(thumbnailPicture.dataset.id);
  const chosenPhoto = localPhotos.find((item) => item.id === id);

  if (chosenPhoto) {
    openGalleryModal(chosenPhoto);
  }
});

// инициализация модалки галереи, клик по превью

import { openGalleryModal } from './gallery-modal.js';

export const picturesContainer = document.querySelector('.pictures');

let localPhotos;

// инициализируем модуль данными
export const initGalleryModal = (photos) => {
  localPhotos = [...photos];
};

// делегированный обработчик клика по контейнеру с превью
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

import { isEscape } from './util.js';

const modalPicture = document.querySelector('.big-picture');
const pagePicturesContainer = document.querySelector('.pictures');
const closeButton = document.querySelector('#picture-cancel');
// const bigPictureImage = document.querySelector('.big-picture__img');

// функция-обработчик клавиш
const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    modalPicture.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

// функция закрытия
const closePictureModal = () => {
  modalPicture.classList.add('hidden');
};

// открытие МОДАЛКИ с большим фото
pagePicturesContainer.addEventListener('click', (evt) => {
  if(evt.target.closest('.picture')) {
    // const originalPicture = evt.target.closest('.picture');
    // const imageLink = originalPicture.querySelector('.picture__img');
    // bigPictureImage.src = imageLink.url;
    modalPicture.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
  }
});

// закрытие МОДАЛКИ с большим фото
closeButton.addEventListener('click', closePictureModal);

// генерация массива фото с комментариями

import {
  getRandomInteger,
  getGeneratedFromToUniq,
  getGeneratedFromTo,
  getElementArray
} from './util.js';

// импорт диапазонов и массивов данных
import {
  MIN_COMMENTS, MAX_COMMENTS,
  MIN_LIKES, MAX_LIKES,
  PHOTOS_NUMBER,
  MIN_PHOTO_ID, MAX_PHOTO_ID,
  MIN_AVATAR_ID, MAX_AVATAR_ID,
  DESCRIPTIONS, NAMES, COMMENTS
} from './data.js';

// создание генераторов (единожды при загрузке модуля)
const photosId = getGeneratedFromToUniq(MIN_PHOTO_ID, MAX_PHOTO_ID);
const photoURL = getGeneratedFromToUniq(MIN_PHOTO_ID, MAX_PHOTO_ID);
const commentId = getGeneratedFromToUniq(1, 9999);
const avatarId = getGeneratedFromTo(MIN_AVATAR_ID, MAX_AVATAR_ID);
const getURL = () => `photos/${photoURL()}.jpg`;

// генераторы случайных элементов из массивов
const randomDescription = getElementArray(DESCRIPTIONS);
const randomName = getElementArray(NAMES);
const randomComment = getElementArray(COMMENTS);

// создание ОДНОГО объекта-коммента
const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${avatarId()}.svg`,
  message: randomComment(),
  name: randomName()
});

// создание массива комментов
const createCommentsArray = () => {
  const count = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  return Array.from ({length: count}, () => createComment());
};

// ГЛАВНАЯ ФУНКЦИЯ: создание массива фотографий с массивом комментариев
export const getPhotos = () => Array.from(
  { length: PHOTOS_NUMBER },
  () => ({
    id: photosId(),
    url: getURL(),
    description: randomDescription(),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: createCommentsArray()
  })
);

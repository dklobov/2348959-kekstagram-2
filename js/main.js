const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Виктория',
  'Артём',
  'Дмитрий',
  'Яна',
  'Василий',
  'Екатерина',
  'Иван'
];
const DESCRIPTIONS = [
  'Величественные горы',
  'Сумасшедшая скоростная автострада',
  'Мои кулинарные изыски',
  'Реки, озёра, горы и альпаки',
  'Романтика деревенской жизни',
  'Курица или яйцо? - вот в чём вопрос',
  'Иван был пьян, играл на фортепиан'
];
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const PHOTOS_NUMBER = 25;

// случайное целое число
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// случайное неповторяющееся число из диапазона
const getGeneratedFromToUniq = (min, max) => {
  const previousValues = [];
  
  return function () {
    let currentValue = getRandomInteger (min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    };
    previousValues.push(currentValue);
    return currentValue;
  };
};

// обёртка для случайного числа из диапазона (с повторениями)
const getGeneratedFromTo = (min, max) => {
  return function () {
    return getRandomInteger(min, max);
  };
};

// случайные объекты из массива (с повторениями)
const getElementArray = (anyArray) => {
  const arrayObjects = anyArray;
  
  return function () {
    const randomIndex = Math.floor(Math.random() * arrayObjects.length);
    return arrayObjects[randomIndex];
  };
};

// генераторы данных
const photosId = getGeneratedFromToUniq (1, 25);
const randomLikes = getGeneratedFromToUniq (MIN_LIKES, MAX_LIKES);
const commentId = getGeneratedFromToUniq (1, 9999);
const commentCount = getGeneratedFromToUniq (MIN_COMMENTS, MAX_COMMENTS);
const avatarId = getGeneratedFromTo (1, 6);

// случайные элементы из массива
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
  const count = commentCount();
  return Array.from ({length: count}, () => createComment());
};

// ЗАДАНИЕ: массив фотографий с массивом комментариев
const getPhotos = Array.from ({length: PHOTOS_NUMBER}, (_, i) => ({
  id: photosId(),
  url: `photos/${i + 1}.jpg`,
  description: randomDescription(),
  likes: randomLikes(),
  comments: createCommentsArray()
}));

// ГЛУБИНА ОТОБРАЖЕНИЯ В НОДЕ
const util = require('util');
util.inspect.defaultOptions.depth = 3;
util.inspect.defaultOptions.colors = true;
// ГЛУБИНА ОТОБРАЖЕНИЯ В НОДЕ

console.log(getPhotos);
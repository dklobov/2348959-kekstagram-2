export const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const NAMES = [
  'Виктория',
  'Артём',
  'Дмитрий',
  'Яна',
  'Василий',
  'Екатерина',
  'Иван'
];

export const DESCRIPTIONS = [
  'Величественные горы',
  'Сумасшедшая скоростная автострада',
  'Мои кулинарные изыски',
  'Реки, озёра, горы и альпаки',
  'Романтика деревенской жизни',
  'Курица или яйцо? - вот в чём вопрос',
  'Иван был пьян, играл на фортепиан'
];

export const MIN_COMMENTS = 0;
export const MAX_COMMENTS = 30;
export const MIN_LIKES = 15;
export const MAX_LIKES = 200;
export const PHOTOS_NUMBER = 25;
export const MIN_PHOTO_ID = 1;
export const MAX_PHOTO_ID = 25;
export const MIN_AVATAR_ID = 1;
export const MAX_AVATAR_ID = 6;

export const MAX_COUNT_HASHTAGS = 5;
export const MAX_DESCRIPTION = 140;
export const HASTAG_FORMULA = /^#[a-zа-я0-9]{1,19}$/i;

export const SCALE_STEP = 25;
export const SCALE_MIN = 25;
export const SCALE_MAX = 100;

export const DEFAULT_EFFECTS = 'none';
export const EFFECT_SETTINGS = {
  none: {
    slider: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
    apply: () => 'none',
  },
  chrome: {
    slider: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    apply: (value) => `grayscale(${value})`, // 0–1
  },
  sepia: {
    slider: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    apply: (value) => `sepia(${value})`,
  },
  marvin: {
    slider: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    apply: (value) => `invert(${value}%)`,
  },
  phobos: {
    slider: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    apply: (value) => `blur(${value}px)`,
  },
  heat: {
    slider: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    apply: (value) => `brightness(${value})`,
  },
};

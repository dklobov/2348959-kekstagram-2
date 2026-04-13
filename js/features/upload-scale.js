// масштабирование в модалке загрузки

import {
  SCALE_STEP,
  SCALE_MIN,
  SCALE_MAX
} from '../core/data.js';

const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleValue = imgUploadScale.querySelector('.scale__control--value');

const previewImage = document.querySelector('.img-upload__preview img');

// текущий масштаб в %
let currentScale = 100;

// применение масштаба к инпуту/картинке
const applyScale = () => {
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
};

// минус-масштабирование (но не ниже SCALE_MIN)
const onSmallerClick = () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    applyScale();
  }
};

// плюс-масштабирование (но не выше SCALE_MAX)
const onBiggerClick = () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    applyScale();
  }
};

// сброс масштаба к дефолтному (100%) при открытии модалки
export const resetScale = () => {
  currentScale = 100;
  applyScale();
};

// обработчики на + / -
scaleSmaller.addEventListener('click', onSmallerClick);
scaleBigger.addEventListener('click', onBiggerClick);

// инициализация зачение при загрузке
applyScale();

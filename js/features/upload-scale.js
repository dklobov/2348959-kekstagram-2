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

let currentScale = SCALE_MAX;

const setScaleButtonState = (button, isDisabled) => {
  button.disabled = isDisabled;
  button.style.pointerEvents = isDisabled ? 'none' : '';
  button.style.cursor = isDisabled ? 'default' : '';

  if (isDisabled) {button.blur()}
};

const updateButtonsState = () => {
  const isAtMin = currentScale === SCALE_MIN;
  const isAtMax = currentScale === SCALE_MAX;

  setScaleButtonState(scaleSmaller, isAtMin);
  setScaleButtonState(scaleBigger, isAtMax);
};

const applyScale = () => {
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale}%)`;

  updateButtonsState();
};

const onSmallerClick = () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;

    applyScale();
  }
};

const onBiggerClick = () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;

    applyScale();
  }
};

export const resetScale = () => {
  currentScale = SCALE_MAX;

  applyScale();
};

scaleSmaller.addEventListener('click', onSmallerClick);
scaleBigger.addEventListener('click', onBiggerClick);

applyScale();

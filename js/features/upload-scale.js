const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const imgUploadScaleElement = document.querySelector('.img-upload__scale');
const previewImageElement = document.querySelector('.img-upload__preview img');
const scaleSmallerElement = imgUploadScaleElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = imgUploadScaleElement.querySelector('.scale__control--bigger');
const scaleValueElement = imgUploadScaleElement.querySelector('.scale__control--value');

let currentScale = SCALE_MAX;

const setScaleButtonState = (button, isDisabled) => {
  button.disabled = isDisabled;
  button.style.pointerEvents = isDisabled ? 'none' : '';
  button.style.cursor = isDisabled ? 'default' : '';

  if (isDisabled) {
    button.blur();
  }
};

const updateButtonsState = () => {
  const isAtMin = currentScale === SCALE_MIN;
  const isAtMax = currentScale === SCALE_MAX;

  setScaleButtonState(scaleSmallerElement, isAtMin);
  setScaleButtonState(scaleBiggerElement, isAtMax);
};

const applyScale = () => {
  scaleValueElement.value = `${currentScale}%`;
  previewImageElement.style.transform = `scale(${currentScale}%)`;
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

scaleSmallerElement.addEventListener('click', onSmallerClick);
scaleBiggerElement.addEventListener('click', onBiggerClick);

applyScale();

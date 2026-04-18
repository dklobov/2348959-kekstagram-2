import { DEFAULT_EFFECTS, EFFECT_SETTINGS } from '../core/data.js';

const imgPreview = document.querySelector('.img-upload__preview img');
const imgEffects = document.querySelector('.img-upload__effects');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderFieldset = document.querySelector('.effect-level');

let currentEffect = DEFAULT_EFFECTS;

const { slider } = EFFECT_SETTINGS[currentEffect];
noUiSlider.create(effectLevelSlider, slider);

const applyEffect = () => {
  const {apply} = EFFECT_SETTINGS[currentEffect];
  const value = Number(effectLevelSlider.noUiSlider.get());

  effectLevelValue.value = value;

  if (currentEffect === DEFAULT_EFFECTS) {
    imgPreview.style.filter = DEFAULT_EFFECTS;
    return;
  }

  imgPreview.style.filter = apply(value);
};

effectLevelSlider.noUiSlider.on('update', applyEffect);

const showSlider = (isVisible = true) => {
  if (isVisible) {
    sliderFieldset.classList.remove('hidden');
  } else {
    sliderFieldset.classList.add('hidden');
  }
};

export const resetEffects = () => {
  currentEffect = DEFAULT_EFFECTS;
  showSlider(false);
  applyEffect();
};

const onEffectChange = ({ target }) => {

  if (!target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = target.value;
  if (currentEffect === DEFAULT_EFFECTS) {
    resetEffects();
    return;
  }

  showSlider();

  effectLevelSlider.noUiSlider.updateOptions(EFFECT_SETTINGS[currentEffect].slider);
  applyEffect();
};

imgEffects.addEventListener('change', onEffectChange);
resetEffects();

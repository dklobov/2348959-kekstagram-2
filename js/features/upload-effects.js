const DEFAULT_EFFECTS = 'none';
const EFFECT_SETTINGS = {
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

const imgPreviewElement = document.querySelector('.img-upload__preview img');
const imgEffectsElement = document.querySelector('.img-upload__effects');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const sliderFieldsetElement = document.querySelector('.effect-level');

let currentEffect = DEFAULT_EFFECTS;

const { slider } = EFFECT_SETTINGS[currentEffect];
noUiSlider.create(effectLevelSliderElement, slider);

const applyEffect = () => {
  const {apply} = EFFECT_SETTINGS[currentEffect];
  const value = Number(effectLevelSliderElement.noUiSlider.get());

  effectLevelValueElement.value = value;

  if (currentEffect === DEFAULT_EFFECTS) {
    imgPreviewElement.style.filter = DEFAULT_EFFECTS;
    return;
  }

  imgPreviewElement.style.filter = apply(value);
};

effectLevelSliderElement.noUiSlider.on('update', applyEffect);

const toggleSlider = () => {
  sliderFieldsetElement.classList.toggle('hidden', currentEffect === DEFAULT_EFFECTS);
};

export const resetEffects = () => {
  currentEffect = DEFAULT_EFFECTS;
  toggleSlider();
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

  toggleSlider();

  effectLevelSliderElement.noUiSlider.updateOptions(EFFECT_SETTINGS[currentEffect].slider);
  applyEffect();
};

imgEffectsElement.addEventListener('change', onEffectChange);
resetEffects();

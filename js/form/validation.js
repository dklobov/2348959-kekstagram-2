import {
  HASTAG_FORMULA,
  MAX_DESCRIPTION
} from '../core/data.js';

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const validation = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const getHashtags = (value) => value.toLowerCase().split(' ').filter((item) => item.length);

const checkDescription = (value) => value.length <= MAX_DESCRIPTION;

const checkHashtags = (value) => {
  if(!value.trim().length) {
    return true;
  }
  const hashtags = getHashtags(value);
  return hashtags.every((item) => HASTAG_FORMULA.test(item));
};

const checkHashtagsLength = (value) => {
  if(!value.trim().length) {
    return true;
  }
  const hashtags = getHashtags(value);
  return hashtags.length <= 5;
};

const checkHashtagsUnique = (value) => {
  if (!value.trim().length) {
    return true;
  }
  const hashtags = getHashtags(value);
  return hashtags.every((hashtag, index, array) => array.indexOf(hashtag) === index);
};

validation.addValidator(
  hashtagInput,
  checkHashtags,
  'Хештэг неверный'
);

validation.addValidator(
  hashtagInput,
  checkHashtagsLength,
  'АСТАНАВИТИСЬ, пяти достаточно'
);

validation.addValidator(
  hashtagInput,
  checkHashtagsUnique,
  'Хештеги не должны повторяться'
);

validation.addValidator(
  description,
  checkDescription,
  `Длина комментария не должна превышать ${MAX_DESCRIPTION} символов`
);

export const isValid = () => validation.validate();

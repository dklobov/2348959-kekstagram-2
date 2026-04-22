const HASHTAG_FORMULA = /^#[a-zа-я0-9]{1,19}$/i;
const MAX_COUNT_HASHTAGS = 5;
const MAX_DESCRIPTION = 140;

const formElement = document.querySelector('.img-upload__form');
const descriptionElement = formElement.querySelector('.text__description');
const hashtagInputElement = formElement.querySelector('.text__hashtags');

const validation = new Pristine(formElement, {
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
  return hashtags.every((item) => HASHTAG_FORMULA.test(item));
};

const checkHashtagsLength = (value) => {
  if(!value.trim().length) {
    return true;
  }
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_COUNT_HASHTAGS;
};

const checkHashtagsUnique = (value) => {
  if (!value.trim().length) {
    return true;
  }
  const hashtags = getHashtags(value);
  return hashtags.every((hashtag, index, array) => array.indexOf(hashtag) === index);
};

validation.addValidator(
  hashtagInputElement,
  checkHashtags,
  'Хештэг неверный'
);

validation.addValidator(
  hashtagInputElement,
  checkHashtagsLength,
  `СТОПЭ! лимит ${MAX_COUNT_HASHTAGS} хештегов`
);

validation.addValidator(
  hashtagInputElement,
  checkHashtagsUnique,
  'Хештеги не должны повторяться'
);

validation.addValidator(
  descriptionElement,
  checkDescription,
  `Длина комментария не должна превышать ${MAX_DESCRIPTION} символов`
);

export const isValid = () => validation.validate();
export const resetValidation = () => {
  validation.reset();
};

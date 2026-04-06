const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

pristine.addValidator(hashtagInput, (value) => {
  const hasNumber = /[0-9]/.test(value);
  return !hasNumber;
}, 'Лошарик, сначала #');

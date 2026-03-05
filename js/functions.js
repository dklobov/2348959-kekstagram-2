function countLength (inputText, maxLength) {
  return inputText.length <= maxLength;
}

// console.log(countLength('проверяемая строка', 20));
// console.log(countLength('проверяемая строка', 18));
// console.log(countLength('проверяемая строка', 10));


function isPalindrom (inputPalindrom) {
  const normalized = inputPalindrom.replaceAll(' ', '').toLowerCase();
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}
// console.log(isPalindrom('проверяемая строка'));
// console.log(isPalindrom('А роза упала на лапу Азора'));


function getNumbers (someText) {
  const stringText = someText.toString().replaceAll(' ', '');
  let numbersString = '';
  for (let i = 0; i <= stringText.length; i++) {
    if (stringText[i] >= 0 && stringText[i] <= 9) {
      numbersString += stringText[i];
    }
  }
  return numbersString;
}
// console.log(getNumbers('2023 год'));
// console.log(getNumbers('ECMAScript 2022'));
// console.log(getNumbers('1 кефир, 0.5 батона'));
// console.log(getNumbers('агент 007'));
// console.log(getNumbers('а я томат'));

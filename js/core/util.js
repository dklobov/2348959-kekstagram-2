// случайные числа, генераторы, isEscape

// случайное целое число
export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// случайное неповторяющееся число из диапазона
export const getGeneratedFromToUniq = (min, max) => {
  const previousValues = [];
  return function () {
    if (previousValues.length >= max - min + 1) {
      return;
    }
    let currentValue = getRandomInteger (min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// обёртка для случайного числа из диапазона (с повторениями)
export const getGeneratedFromTo = (min, max) => () => getRandomInteger(min, max);

// случайные объекты из массива (с повторениями)
export const getElementArray = (anyArray) => {
  const arrayObjects = anyArray;
  return function () {
    const randomIndex = Math.floor(Math.random() * arrayObjects.length);
    return arrayObjects[randomIndex];
  };
};

// проверка нажатия Escape
export const isEscape = (evt) => evt.key === 'Escape';

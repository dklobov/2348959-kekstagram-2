import { debounce } from '../core/util.js';
import { renderPhotos } from './gallery-render.js';

export const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const RANDOM_LIMIT = 10;

const imgFiltersElement = document.querySelector('.img-filters');
const formElement = document.querySelector('.img-filters__form');

let localPhotos;

const debouncedRender = debounce(renderPhotos);

export const initFilters = (pictures) => {
  localPhotos = [...pictures];
  imgFiltersElement.classList.remove('img-filters--inactive');
};

const setActiveButton = (button) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const filterPhotos = {
  [FILTERS.DEFAULT]: () => localPhotos,
  [FILTERS.DISCUSSED]: () => [...localPhotos].sort((a, b) => b.comments.length - a.comments.length),
  [FILTERS.RANDOM]: () => [...localPhotos].sort(() => Math.random() - 0.5).slice(0, RANDOM_LIMIT)
};

formElement.addEventListener('click', ({ target }) => {
  const button = target.closest('.img-filters__button');
  if (button) {
    setActiveButton(button);
    const sortedPhotos = filterPhotos[button.id]();
    debouncedRender(sortedPhotos);
  }
});

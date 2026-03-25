import { renderPhotos } from './render-photos.js';
import { PHOTOS_NUMBER } from './data.js';
import { getPhotos } from './setup.js';

const render = getPhotos(PHOTOS_NUMBER);
renderPhotos(render);

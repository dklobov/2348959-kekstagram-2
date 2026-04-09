// точка входа: getPhotos, рендер галереи, initGalleryModal, подключение upload-части

import { getPhotos } from './core/photos-generator.js';
import { renderPhotos } from './features/gallery-render.js';
import { initGalleryModal } from './features/gallery-init.js';

import './features/upload-modal.js';
import './features/upload-form.js';

const photos = getPhotos();
renderPhotos(photos);
initGalleryModal(photos);

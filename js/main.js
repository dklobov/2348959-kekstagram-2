import { getPhotos } from './core/photos-generator.js';
import { renderPhotos } from './features/gallery-render.js';
import { initGalleryModal } from './features/gallery-init.js';

import './features/upload-modal.js';
import './form/form.js';

const photos = getPhotos();
renderPhotos(photos);
initGalleryModal(photos);

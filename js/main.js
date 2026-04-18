import { getPhotos } from './core/api.js';
import { showFilters } from './core/data.js';
import { renderPhotos } from './features/gallery-render.js';
import { showDataError } from './widgets/messages.js';
import { initGalleryModal } from './features/gallery-init.js';

import './form/form.js';
import './form/form-submit.js';
import './features/upload-modal.js';
import './features/upload-scale.js';
import './features/upload-effects.js';


const initApp = async () => {
  try {
    const photos = await getPhotos();
    showFilters();
    renderPhotos(photos);
    initGalleryModal(photos);
  } catch (err) {
    showDataError();
    console.error(err);
  }
};

initApp();

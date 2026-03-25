const onePhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

export const renderPhotos = (getPhotos) => {
  const compiledPhotoCards = document.createDocumentFragment();

  getPhotos.forEach((photo) => {
    const onePhoto = onePhotoTemplate.cloneNode(true);
    const cardImg = onePhoto.querySelector('.picture__img');
    const cardLikes = onePhoto.querySelector('.picture__likes');
    const cardComments = onePhoto.querySelector('.picture__comments');

    cardImg.src = photo.url;
    cardImg.alt = photo.description;
    cardComments.textContent = photo.comments.length;
    cardLikes.textContent = photo.likes;

    compiledPhotoCards.append(onePhoto);
  });

  picturesContainer.append(compiledPhotoCards);
};

// 📁 main.js

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const defaultQuery = 'sunset';

getImagesByQuery(defaultQuery)
  .then(data => {
    createGallery(data.hits);
  })
  .catch(error => {
    iziToast.error({
      title: 'Error',
      message: 'Не вдалося отримати зображення. Спробуй ще раз!',
      position: 'topRight',
    });
    console.error(error);
  });


const form = document.querySelector('.form');
const input = form.elements['search-text'];

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Oops',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  }
});

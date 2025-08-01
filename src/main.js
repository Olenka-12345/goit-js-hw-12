import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const input = document.querySelector('input');
const loadMoreBtn = document.querySelector('#load-more');

let query = '';
let page = 1;
let totalPages = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = input.value.trim();
  page = 1;

  if (query === '') {
    iziToast.error({ message: 'Please enter a search term' });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  // ❌ Лоадер не показуємо при першому запиті

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader(); // на всяк випадок, якщо залишився

    if (data.totalHits === 0) {
      iziToast.error({ message: 'No images found' });
      return;
    }

    createGallery(data.hits);
    iziToast.success({ message: `Hooray! We found ${data.totalHits} images` });

    totalPages = Math.ceil(data.totalHits / 15);
    if (page < totalPages) showLoadMoreButton();
    else iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
  } catch (error) {
    hideLoader();
    iziToast.error({ message: 'Error loading images' });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  showLoader(); // ✅ Лоадер показуємо тільки тут

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();
    createGallery(data.hits);
    scrollGallery();

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }
  } catch {
    hideLoader();
    iziToast.error({ message: 'Failed to load more images' });
  }
});

function scrollGallery() {
  const card = document.querySelector('.gallery-item');
  if (!card) return;

  const height = card.getBoundingClientRect().height;
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth'
  });
}

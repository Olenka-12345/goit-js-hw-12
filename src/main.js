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
import './css/style.css';


let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const form = document.querySelector('form');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', async e => {
  e.preventDefault();
  currentQuery = e.target.elements['search-text'].value.trim();
  if (!currentQuery) return;

  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ message: 'No images found. Try another search.' });
      hideLoader();
      return;
    }

    createGallery(data.hits);
    hideLoader();

    if (currentPage * 15 < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Error loading images. Please try again.' });
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    hideLoader();

    if (currentPage * 15 >= totalHits) {
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }

    const { height } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({ message: 'Error loading more images.' });
    hideLoader();
  }
});

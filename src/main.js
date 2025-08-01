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
let isLoading = false;
let enableScrollLoading = false;

const form = document.querySelector('form');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', async e => {
  e.preventDefault();
  currentQuery = e.target.elements['search-text'].value.trim();
  if (!currentQuery) return;

  currentPage = 1;
  enableScrollLoading = false;
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

    if (totalHits > 15) {
      loadMoreBtn.textContent = 'Load More';
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

    if (currentPage === 2 && totalHits > currentPage * 15) {
      loadMoreBtn.textContent = 'Scroll to load more';
      showLoadMoreButton();
    }

    if (currentPage >= 3) {
      enableScrollLoading = true;
      hideLoadMoreButton();
    }

    if (currentPage * 15 >= totalHits) {
      iziToast.info({ message: "You've reached the end of search results." });
    }

    const { height } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({ message: 'Error loading more images.' });
    hideLoader();
  }
});

window.addEventListener('scroll', async () => {
  if (!enableScrollLoading || isLoading) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    if (currentPage * 15 >= totalHits) return;

    currentPage += 1;
    isLoading = true;

    iziToast.info({
      message: 'Loading images, please wait...',
      position: 'bottomCenter',
      timeout: 2000,
      progressBar: false,
      close: false
    });

    showLoader();

    try {
      const data = await getImagesByQuery(currentQuery, currentPage);
      createGallery(data.hits);
      hideLoader();
      isLoading = false;

      if (currentPage * 15 >= totalHits) {
        iziToast.info({ message: "You've reached the end of search results." });
      }
    } catch (error) {
      iziToast.error({ message: 'Error loading more images.' });
      hideLoader();
      isLoading = false;
    }
  }
});


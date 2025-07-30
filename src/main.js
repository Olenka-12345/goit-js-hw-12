import { fetchImages, resetPage } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');
let currentQuery = '';

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) {
    iziToast.warning({ title: 'Oops', message: 'Please enter a search term!', position: 'topRight' });
    return;
  }

  currentQuery = query;
  resetPage();
  clearGallery();
  loadMoreBtn.classList.add('hidden');
  showLoader();

  try {
    const { hits, isLastPage } = await fetchImages(currentQuery);
    hideLoader();

    if (hits.length === 0) {
      iziToast.error({ title: 'No Results', message: 'Try another word!', position: 'topRight' });
      return;
    }

    createGallery(hits);

    if (isLastPage) {
      iziToast.info({ title: 'End', message: `You've reached the end of search results.`, position: 'topRight' });
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: 'Something went wrong...', position: 'topRight' });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader();

  try {
    const { hits, isLastPage } = await fetchImages(currentQuery);
    hideLoader();

    createGallery(hits);
    scrollPage();

    if (isLastPage) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({ title: 'End', message: `You've reached the end of search results.`, position: 'topRight' });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: 'Could not load more images.', position: 'topRight' });
  }
});

function scrollPage() {
  const cardHeight = document.querySelector('.gallery-item')?.getBoundingClientRect().height || 0;
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}

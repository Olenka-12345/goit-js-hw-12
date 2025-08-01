import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    query = event.currentTarget.elements['search-text'].value.trim();
    page = 1;

    if (!query) {
        iziToast.warning({
            message: 'Please enter a search query!',
            position: 'topRight',
        });
        return;
    }

    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page, perPage);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            return;
        }
        createGallery(data.hits);
        if (perPage * page < totalHits) showLoadMoreButton();
    } catch (error) {
        iziToast.error({
            message: 'Oops! Something went wrong. Try again later.',
            position: 'topRight',
        });
        console.error(error);
    } finally {
        hideLoader();
    }
});
 
loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(query, page, perPage);
        createGallery(data.hits);

        const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });

        if (perPage * page >= totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.error({ message: 'Failed to load more images.', position: 'topRight' });
        console.error(error);
    } finally {
        hideLoader();
    }
});


import axios from 'axios';

const API_KEY = '51504630-db9fa299e862fff98d3dacf4e';
const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;
let currentQuery = '';
const PER_PAGE = 15;

export async function fetchImages(query) {
  if (query !== currentQuery) {
    currentPage = 1;
    currentQuery = query;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: PER_PAGE,
      },
    });

    const { hits, totalHits } = response.data;
    const isLastPage = currentPage * PER_PAGE >= totalHits;

    currentPage++;
    return { hits, isLastPage };
  } catch (error) {
    console.error('❌ Error fetching images:', error.message);
    throw error;
  }
}

export function resetPage() {
  currentPage = 1;
}

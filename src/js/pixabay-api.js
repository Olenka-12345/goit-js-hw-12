import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51504630-db9fa299e862fff98d3dacf4e';

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}

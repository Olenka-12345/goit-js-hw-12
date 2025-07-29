import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51504630-db9fa299e862fff98d3dacf4e';




export async function getImagesByQuery(query, page = 1, perPage = 40) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
    lang: 'uk',
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('❌ Помилка запиту до Pixabay API:', error.message);
    throw error;
  }
}

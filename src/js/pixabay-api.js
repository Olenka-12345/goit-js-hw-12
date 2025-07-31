const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51504630-db9fa299e862fff98d3dacf4e';

export async function getImagesByQuery(query, page) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();
  return data;
}

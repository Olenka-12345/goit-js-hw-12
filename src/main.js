let currentPage = 1;
let currentQuery = '';
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');

async function fetchImages(query, page = 1) {
  toggleLoading(page);

  try {
    const response = await fetchFromPixabay(query, page); // твоя функція API
    renderImages(response.hits);

    currentPage = page;
    toggleLoading(null); // приховати все після завантаження
  } catch (error) {
    console.error('Error fetching images:', error);
    toggleLoading(null);
  }
}

function renderImages(images) {
  const markup = images.map(img => `
    <div class="photo-card">
      <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${img.likes}</p>
        <p><b>Views:</b> ${img.views}</p>
        <p><b>Comments:</b> ${img.comments}</p>
        <p><b>Downloads:</b> ${img.downloads}</p>
      </div>
    </div>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function toggleLoading(page) {
  if (page === 1) {
    loadMoreBtn.style.display = 'block';
    loader.style.display = 'none';
  } else if (page > 1) {
    loadMoreBtn.style.display = 'none';
    loader.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'block';
    loader.style.display = 'none';
  }
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  gallery.innerHTML = '';
  currentQuery = e.target.elements['search-text'].value.trim();
  currentPage = 1;
  fetchImages(currentQuery, currentPage);
});

loadMoreBtn.addEventListener('click', () => {
  fetchImages(currentQuery, currentPage + 1);
});

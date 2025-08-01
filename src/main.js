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
  

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader(); // на випадок, якщо залишився

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

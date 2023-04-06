const priceRangeInput = document.querySelector('#price-range');
const distanceRangeInput = document.querySelector('#distance-range');

priceRangeInput.addEventListener('input', filterSearchResults);
distanceRangeInput.addEventListener('input', filterSearchResults);

function filterSearchResults() {
  const priceRangeValue = priceRangeInput.value;
  const distanceRangeValue = distanceRangeInput.value;
  
  // Use the current values to filter and display search results
  // ...
}

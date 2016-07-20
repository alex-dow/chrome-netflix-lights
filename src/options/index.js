var optionsForm = document.getElementById('options-form');

optionsForm.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('saving options');
  return false;
});

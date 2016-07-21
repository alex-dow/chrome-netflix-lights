var Slider = require('bootstrap-slider');

module.exports = function(selector, initValue, min, max) {

  document.getElementById(selector).setAttribute('data-slider-value', initValue);

  return new Slider('#' + selector, {
    precision: 1,
    min: min,
    max: max
  });

};

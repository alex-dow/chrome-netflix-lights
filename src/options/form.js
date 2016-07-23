var Storage = chrome.storage.local;

var slider = require('./slider.js');

var sliders = {};

var formGroups = ['global','group1','group2','group3','group4'];
var properties = ['enable-start-color','start-color','enable-end-color','end-color','enable-fade-speed','fade-speed'];

function getValuesFor(formGroup) {

  var vals = {};

  properties.forEach(function(prop) {

    console.log('get value for: ' + formGroup + '-' + prop);

    var propEl = document.getElementById(formGroup + '-' + prop);

    var val = null;
    if (prop.indexOf('enable') > -1) {
      val = propEl.checked;
    } else {
      val = propEl.value;
    }

    vals[prop] = val;
  });

  return vals;
}

function onSave(e) {

  var formGroup = e.target.id.split('-').pop();

  var formValues = getValuesFor(formGroup);

  var items = {};

  items[formGroup] = formValues;

  console.log('Saving', items);

  Storage.set(items, function() {

    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
  });
}

function resetSlider(sliderId) {

  var formGroup = sliderId.split('-').shift();

  if (formGroup in sliders) {
    sliders[formGroup].destroy();
  }
  sliders[formGroup] = slider(sliderId, document.getElementById(sliderId).value, 0, 100);
}

function resetBackgroundColor(id) {

  var el = document.getElementById(id);
  el.setAttribute('style', 'background-color: #' + el.value);

}

function setFormValues(group) {
  Storage.get(group, function(items) {
    properties.forEach(function(prop) {
      var propEl = document.getElementById(group + '-' + prop);
      var propVal = items[group][prop];

      if (prop.indexOf('enable') > -1) {
        propEl.checked = propVal;
      } else {
        propEl.value = propVal;
      }
    });

    resetSlider(group + '-fade-speed');
    resetBackgroundColor(group + '-start-color');
    resetBackgroundColor(group + '-end-color');
  });
}

function onReset() {
  formGroups.forEach(function(formGroup) {
    setFormValues(formGroup);
  });
}

function onLoad() {
  onReset();

  document.querySelectorAll('button[role=save]').forEach(function(el) {
    el.addEventListener('click', onSave);
  });

  document.querySelectorAll('button[role=reset]').forEach(function(el) {
    el.addEventListener('click', onReset);
  });
}

module.exports = {
  getValuesFor: getValuesFor,
  onSave: onSave,
  onLoad: onLoad
};

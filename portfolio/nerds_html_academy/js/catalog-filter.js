const rangeSlider = document.querySelector('#range-slider')

noUiSlider.create(rangeSlider, {
  start: [0, 15000],
  connect: true,
  step: 1,
  range: {
    'min': 0,
    'max': 23000
  }
});

const from = document.querySelector("#range-input-from");
const to = document.querySelector("#range-input-to");
const inputs = [from, to];

rangeSlider.noUiSlider.on('update', function(values, handle){
  inputs[handle].value = Math.round(values[handle]);
});

const setRangeSlider = (i, value) => {
  let arr = [null, null];
  arr[i] = value;

  console.log(arr);

  rangeSlider.noUiSlider.set(arr);
};

inputs.forEach((el, index) => {
  el.addEventListener('change', (e) => {
    console.log(index);
    setRangeSlider(index, e.currentTarget.value);
  });
});

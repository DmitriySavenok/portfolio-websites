const newText = document.querySelector('#newText')
const newText2 = document.querySelector('#newText2')
const date = new Date('2022-03-16 14:02').toISOString();

let timer = setInterval(() => {
  if (date <= new Date().toISOString()) {
    newText.textContent = 'Привет Настик!'
    newText2.textContent = 'Настик Сластик!'
    clearInterval(timer)
  }
}, 1000)

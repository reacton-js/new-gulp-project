const buttonUp = document.querySelector('.button-up')

buttonUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

window.addEventListener('scroll', () => {
  if (window.scrollY > 150) {
    buttonUp.classList.add('button-up--show')
  }
  else {
    buttonUp.classList.remove('button-up--show')
  }
})
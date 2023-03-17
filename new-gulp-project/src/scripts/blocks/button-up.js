const buttonUp = document.querySelector('.button-up')

buttonUp.addEventListener('click', () => {
  document.body.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
})

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 150) {
    buttonUp.classList.add('button-up--show')
  }
  else {
    buttonUp.classList.remove('button-up--show')
  }
})
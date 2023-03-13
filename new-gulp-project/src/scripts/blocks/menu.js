const inner = document.querySelector('.menu__inner')
const button = inner.querySelector('.menu__button')

function toggle() {
  button.classList.toggle('menu__button--close')
  inner.classList.toggle('menu__inner--open')
}

function remove() {
  button.classList.remove('menu__button--close')
  inner.classList.remove('menu__inner--open')
}

inner.addEventListener('click', () => {
  remove()
})

button.addEventListener('click', event => {
  toggle()
  event.stopPropagation()
})

document.addEventListener('keyup', event => {
  if (event.code === 'Escape') {
    remove()
    inner.scrollTop = 0
  }
})
const menu = document.querySelector('.menu')
const inner = menu.querySelector('.menu__inner')
const button = inner.querySelector('.menu__button')
let offsetY = 0

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

window.addEventListener('scroll', () => {
  if (window.scrollY > 150 && offsetY < window.scrollY) {
    menu.classList.add('menu--hide')
  }
  else {
    menu.classList.remove('menu--hide')
  }
  offsetY = window.scrollY
})
import { Home } from '../../pages/Home/Home'
import { navigate } from '../../utils/functions/navigate'
import { routes } from '../../utils/routes/routes'
import './Header.css'

export const Header = () => {
  const header = document.createElement('header')
  const nav = document.createElement('nav')
  const logo = document.createElement('img')
  const ul = document.createElement('ul')
  const aLogo = document.createElement('a')
  const bAbrir = document.createElement('button')
  bAbrir.className = 'abrir'
  const bcerrar = document.createElement('button')
  bcerrar.className = 'cerrar'
  bAbrir.innerHTML = '<i class="bi bi-list"></i>'
  bcerrar.innerHTML = '<i class="bi bi-x-square"></i>'

  aLogo.className = 'aLogo'

  logo.src =
    'https://res.cloudinary.com/dpqksttwy/image/upload/v1725192120/Proyecto10/7aZlNY-LogoMakr_vkpdd3.png'
  logo.alt = 'Logo'
  logo.className = 'logo'

  aLogo.href = '/home'
  aLogo.addEventListener('click', (e) => {
    e.preventDefault()
    navigate(e, { path: '/home', page: Home })
  })
  for (const route of routes) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.addEventListener('click', (e) => navigate(e, route))

    a.textContent = route.text
    a.href = route.path

    li.append(a)
    ul.append(li)
  }

  bAbrir.addEventListener('click', () => {
    nav.classList.add('visible')
  })
  bcerrar.addEventListener('click', () => {
    nav.classList.remove('visible')
  })

  header.append(aLogo)
  header.append(bAbrir)
  header.append(nav)
  aLogo.append(logo)
  nav.append(bcerrar)
  nav.append(ul)
  document.body.append(header)
}

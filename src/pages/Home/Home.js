import { Button } from '../../components/Button/Button'
import { crearPagina } from '../../utils/functions/crearPagina'
import { navigate } from '../../utils/functions/navigate'
import { eventos } from '../Eventos/Eventos'
import { Login } from '../Login/Login'
import './Homes.css'

export const Home = () => {
  const div = crearPagina('Home')
  const h1Home = document.createElement('h1')
  h1Home.innerHTML =
    '<span class="epoca">Epoca</span><span class="fest">Fest</span>'

  const pHome = document.createElement('h2')
  pHome.innerHTML = ''
  pHome.textContent = '¡Vive momentos inolvidables!'
  div.append(h1Home)
  div.append(pHome)
  const divButton = document.createElement('div')
  divButton.className = 'divButton-Home'
  div.append(divButton)
  divButton.append(
    Button({
      text: 'Eventos',
      fnc: (e) => {
        e.preventDefault()
        navigate(e, { path: '/eventos', page: eventos })
      }
    })
  )
  divButton.append(
    Button({
      text: 'Inicia sesión',
      fnc: (e) => {
        e.preventDefault()
        navigate(e, { path: '/login', page: Login })
      }
    })
  )
}

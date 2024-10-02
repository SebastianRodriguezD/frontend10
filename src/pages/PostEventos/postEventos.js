import { Button } from '../../components/Button/Button'
import { postEventosForm } from '../../components/PostEventosForm/postEventosForm'
import { crearPagina } from '../../utils/functions/crearPagina'
import { navigate } from '../../utils/functions/navigate'
import { doPostEvento } from '../../utils/functions/postEventoApi'
import { eventos } from '../Eventos/Eventos'
import { Login } from '../Login/Login'
import './postEventos.css'

export const postEventos = () => {
  const existingToken = localStorage.getItem('token')
  if (!existingToken) {
    alert('Por favor, inicie sesión para acceder a esta página.')
    navigate(event, { path: '/login', page: Login })
    return
  }

  const div = crearPagina('PublicarEvento')
  const form = document.createElement('form')
  const button = Button({
    text: 'Eventos',
    fnc: (e) => {
      e.preventDefault()
      navigate(e, { path: '/eventos', page: eventos })
    }
  })

  postEventosForm(form)
  form.addEventListener('submit', doPostEvento)

  div.append(form)
  div.append(button)
  return div
}

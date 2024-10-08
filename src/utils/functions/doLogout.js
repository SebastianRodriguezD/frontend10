import { Login } from '../../pages/Login/Login'
import { navigate } from './navigate'

export const doLogout = (e) => {
  e.preventDefault()
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('favoritos')

  alert('Sesión cerrada con éxito.')

  // Redirigir al usuario a la página de login o la página que desees
  navigate(e, { path: '/login', page: Login })
}

import { Login } from '../../pages/Login/Login'
import { navigate } from './navigate'

export const doLogout = (e) => {
  e.preventDefault()

  localStorage.removeItem('token')

  alert('Has cerrado sesión con éxito.')

  navigate(e, { path: '/login', page: Login })
}

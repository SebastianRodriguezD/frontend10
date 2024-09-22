import { Button } from '../../components/Button/Button'
import { LoginForm } from '../../components/LoginForm/LoginForm'
import { RegistroForm } from '../../components/RegistroForm/RegistroForm'
import { crearPagina } from '../../utils/functions/crearPagina'
import { doLogin } from '../../utils/functions/doLogin'
import { doRegistro } from '../../utils/functions/doRegistro'
import { doLogout } from '../../utils/functions/doLogout'
import './Login.css'

let showLogin = true

export const Login = () => {
  const div = crearPagina('Login')

  const existingToken = localStorage.getItem('token')

  if (existingToken) {
    const logoutButton = Button({
      text: 'Cerrar sesión',
      fnc: doLogout
    })

    div.append(logoutButton)
  } else {
    const form = document.createElement('form')
    const button = Button({
      text: 'Registrate si no tienes cuenta',
      fnc: () => {
        showLogin = !showLogin
        if (showLogin) {
          LoginForm(form)
          button.textContent = 'Registrate si no tienes cuenta'
          form.removeEventListener('submit', doRegistro)
          form.addEventListener('submit', doLogin)
        } else {
          RegistroForm(form)
          button.textContent = 'Inicia sesión si tienes cuenta'
          form.removeEventListener('submit', doLogin)
          form.addEventListener('submit', doRegistro)
        }
      }
    })

    LoginForm(form)
    form.addEventListener('submit', doLogin)

    div.append(form)
    div.append(button)
  }
}

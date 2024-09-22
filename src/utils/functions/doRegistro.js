import { API } from '../API/API'
import { navigate } from '../../utils/functions/navigate'
import { Login } from '../../pages/Login/Login'

export const doRegistro = async (e) => {
  e.preventDefault()

  const [emailInput, passwordInput, nameInput, lastNameInput] = e.target

  const body = {
    userName: nameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  }

  const loadingElement = document.createElement('div')
  loadingElement.textContent = 'Registrando...'
  loadingElement.className = 'loading'
  document.body.appendChild(loadingElement)

  try {
    const res = await API({
      endpoint: '/users/register',
      body,
      method: 'POST'
    })

    if (res && res.data) {
      alert('Registro exitoso. Ahora puedes iniciar sesión.')

      navigate(e, { path: '/login', page: Login })
    } else {
      console.error('Error en el registro:', res)
      alert('Hubo un error al registrar. Por favor, intenta de nuevo.')
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    alert(
      'Hubo un problema con la solicitud. Por favor, inténtalo de nuevo más tarde.'
    )
  } finally {
    // Ocultar el indicador de carga
    if (loadingElement) {
      document.body.removeChild(loadingElement)
    }
  }
}

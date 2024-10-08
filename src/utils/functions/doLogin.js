import { API } from '../API/API'
import { navigate } from '../../utils/functions/navigate'
import { eventos } from '../../pages/Eventos/Eventos'

export const doLogin = async (e) => {
  e.preventDefault()
  const existingToken = localStorage.getItem('token')
  if (existingToken) {
    alert('Ya hay una sesión activa.')
    return
  }

  const [emailInput, passwordInput] = e.target
  const body = {
    email: emailInput.value,
    password: passwordInput.value
  }

  const loadingElement = document.createElement('div')
  loadingElement.textContent = 'Cargando...'
  loadingElement.className = 'loading'
  document.body.appendChild(loadingElement)
  try {
    const res = await API({
      endpoint: '/users/login',
      body,
      method: 'POST'
    })

    if (res && res.data && res.data.token) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.user._id)

      alert('Inicio de sesión con éxito.')
      navigate(e, { path: '/eventos', page: eventos })
    } else {
      console.error('Inicio de sesión no fue exitoso:', res)
      alert(
        'Error en el inicio de sesión. Por favor, verifica los datos introducidos.'
      )
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    alert(
      'Hubo un problema con la solicitud. Por favor, inténtalo de nuevo más tarde.'
    )
  } finally {
    if (loadingElement) {
      document.body.removeChild(loadingElement)
    }
  }
}

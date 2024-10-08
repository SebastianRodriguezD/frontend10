import { API } from '../API/API'
export const addFavoritos = async (eventId) => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('Debes iniciar sesión para añadir favoritos.')
    return { success: false }
  }

  const loadingElement = document.createElement('div')
  loadingElement.textContent = 'Confirmando asistencia...'

  loadingElement.className = 'loading'
  document.body.appendChild(loadingElement)

  try {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      throw new Error('User ID no encontrado')
    }

    const res = await API({
      endpoint: `/users/${userId}/event/${eventId}/favorite`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res && res.ok) {
      return { success: true }
    } else {
      console.error('Error al añadir el evento a favoritos:', res)
      return { success: false }
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    return { success: false }
  } finally {
    if (loadingElement) {
      document.body.removeChild(loadingElement)
    }
  }
}

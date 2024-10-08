import { API } from '../API/API'
export const removeFavoritos = async (eventId) => {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  if (!token || !userId) {
    alert('Debes iniciar sesión para eliminar favoritos.')
    return { success: false }
  }

  const loadingElement = document.createElement('div')
  loadingElement.textContent = 'Cancelando asistencia...'
  loadingElement.className = 'loading'
  document.body.appendChild(loadingElement)

  try {
    const res = await API({
      endpoint: `/users/${userId}/favoritos/${eventId}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res && res.ok) {
      return { success: true }
    } else {
      console.error('Error al eliminar el evento de favoritos:', res)
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

import { API } from '../API/API'

export const loadFavoritos = async () => {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  if (userId && token) {
    const response = await API({
      endpoint: `/users/${userId}/favoritos`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response && response.ok) {
      return response.data
    } else {
      console.error('Error al cargar favoritos:', response)
    }
  }
  return []
}

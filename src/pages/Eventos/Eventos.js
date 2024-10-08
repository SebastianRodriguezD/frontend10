import { API } from '../../utils/API/API'
import { crearPagina } from '../../utils/functions/crearPagina'
import { Button } from '../../components/Button/Button'
import './Eventos.css'
import { navigate } from '../../utils/functions/navigate'
import { Login } from '../Login/Login'
import { removeFavoritos } from '../../utils/functions/removeFavoritos'
import { addFavoritos } from '../../utils/functions/addfavoritos'
import { loadFavoritos } from '../../utils/functions/loadeventos'

export const eventos = async () => {
  const div = crearPagina('eventos')
  const loadingElement = document.createElement('div')
  loadingElement.textContent = 'Cargando Eventos...'
  loadingElement.className = 'loading'
  div.appendChild(loadingElement)

  try {
    const res = await API({
      endpoint: '/eventos',
      token: localStorage.getItem('token')
    })

    if (loadingElement) {
      div.removeChild(loadingElement)
    }

    const eventosData = res.data

    const favoritosIds = await loadFavoritos()
    const favoritos = favoritosIds.reduce((acc, eventoId) => {
      acc[eventoId] = true
      return acc
    }, {})

    for (const evento of eventosData) {
      if (!evento.titulo) {
        console.error('Título del evento no definido:', evento)
        continue
      }

      const eventDiv = document.createElement('div')
      eventDiv.classList.add('evento')

      eventDiv.innerHTML = `
        <img src="${evento.caratula}" alt="${evento.titulo}">
        <h3>${evento.titulo}</h3>
        <p>${evento.fecha}</p>
        <p>${evento.ciudad}</p>
      `

      const descripcionTexto =
        evento.info && typeof evento.info === 'string'
          ? evento.info.substring(0, 200)
          : 'Descripción no disponible'
      const descripcion = document.createElement('p')
      descripcion.textContent = descripcionTexto
      descripcion.classList.add('descripcion')
      descripcion.style.display = 'none'
      eventDiv.appendChild(descripcion)

      const masInfoButton = Button({
        text: '+ Info',
        fnc: () => {
          if (descripcion.style.display === 'none') {
            descripcion.style.display = 'block'
            masInfoButton.textContent = '- Info'
          } else {
            descripcion.style.display = 'none'
            masInfoButton.textContent = '+ Info'
          }
        }
      })
      eventDiv.appendChild(masInfoButton)

      const favoritoButton = Button({
        text: favoritos[evento._id]
          ? 'Cancelar Asistencia'
          : 'Confirmar Asistencia',
        fnc: async (e) => {
          const existingToken = localStorage.getItem('token')

          if (!existingToken) {
            alert('Debes iniciar sesión para gestionar favoritos.')
            e.preventDefault()
            navigate(e, { path: '/login', page: Login })
            return
          }

          try {
            if (favoritos[evento._id]) {
              await removeFavoritos(evento._id)
              delete favoritos[evento._id]
              favoritoButton.textContent = 'Confirmar Asistencia'
              alert('Asistencia al evento cancelada.')
            } else {
              await addFavoritos(evento._id)
              favoritos[evento._id] = true
              favoritoButton.textContent = 'Cancelar Asistencia'
              alert('Asistencia al evento confirmada.')
            }
          } catch (error) {
            console.error('Error en la operación de favoritos:', error)
            alert(
              'Ocurrió un error al procesar tu solicitud. Intenta de nuevo.'
            )
          }
        }
      })

      eventDiv.appendChild(favoritoButton)

      if (favoritos[evento._id]) {
        favoritoButton.textContent = 'Cancelar Asistencia'
      } else {
        favoritoButton.textContent = 'Confirmar Asistencia'
      }

      div.appendChild(eventDiv)
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    div.innerHTML = '<p>Error al cargar los datos</p>'
  } finally {
    if (div.contains(loadingElement)) {
      div.removeChild(loadingElement)
    }
  }
}

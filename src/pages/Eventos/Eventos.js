import { API } from '../../utils/API/API'
import { crearPagina } from '../../utils/functions/crearPagina'
import { Button } from '../../components/Button/Button'
import './Eventos.css'
import { navigate } from '../../utils/functions/navigate'
import { Login } from '../Login/Login'

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

    const asistenciasConfirmadas =
      JSON.parse(localStorage.getItem('asistencias')) || {}

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

      const confirmarAsistencia = document.createElement('input')
      confirmarAsistencia.type = 'checkbox'
      const checkboxTitle = `asistencia-${evento.titulo.replace(/\s+/g, '-')}`
      confirmarAsistencia.id = checkboxTitle

      confirmarAsistencia.checked =
        asistenciasConfirmadas[evento.titulo] || false

      const asistenciaDiv = document.createElement('div')
      asistenciaDiv.classList.add('asistencia')

      const textoAsistencia = document.createElement('span')
      textoAsistencia.textContent = 'Asistir'
      textoAsistencia.style.marginLeft = '8px'

      confirmarAsistencia.addEventListener('change', async (e) => {
        const existingToken = localStorage.getItem('token')

        if (!existingToken) {
          alert('Debes iniciar sesión para confirmar tu asistencia.')

          e.target.checked = false
          navigate(e, { path: '/login', page: Login })
          return
        }

        if (e.target.checked) {
          alert('¡Asistencia confirmada para el evento: ' + evento.titulo + '!')
          asistenciasConfirmadas[evento.titulo] = true
        } else {
          alert('Has cancelado la asistencia para el evento: ' + evento.titulo)
          delete asistenciasConfirmadas[evento.titulo]
        }

        localStorage.setItem(
          'asistencias',
          JSON.stringify(asistenciasConfirmadas)
        )
      })

      asistenciaDiv.appendChild(confirmarAsistencia)
      asistenciaDiv.appendChild(textoAsistencia)

      eventDiv.appendChild(asistenciaDiv)

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

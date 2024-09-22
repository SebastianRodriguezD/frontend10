import { API } from '../../utils/API/API'
import { crearPagina } from '../../utils/functions/crearPagina'
import { Button } from '../../components/Button/Button'
import './Eventos.css'

export const eventos = async () => {
  const div = crearPagina('eventos')
  const res = await API({
    endpoint: '/eventos',
    token: localStorage.getItem('token')
  })

  const eventosData = res.data

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

    const asistenciaDiv = document.createElement('div')
    asistenciaDiv.classList.add('asistencia')

    const textoAsistencia = document.createElement('span')
    textoAsistencia.textContent = 'Asistir'
    textoAsistencia.style.marginLeft = '8px'

    confirmarAsistencia.addEventListener('change', async (e) => {
      if (e.target.checked) {
        alert('¡Asistencia confirmada para el evento: ' + evento.titulo + '!')
      } else {
        alert('Has cancelado la asistencia para el evento: ' + evento.titulo)
      }
    })

    asistenciaDiv.appendChild(confirmarAsistencia)
    asistenciaDiv.appendChild(textoAsistencia)

    eventDiv.appendChild(asistenciaDiv)

    div.appendChild(eventDiv)
  }
}

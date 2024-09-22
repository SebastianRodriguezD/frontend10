import { API } from '../API/API'
import { navigate } from './navigate'
import { eventos } from '../../pages/Eventos/Eventos'
const formatearFecha = (fechaInput) => {
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  const fecha = new Date(fechaInput)
  const dia = fecha.getDate()
  const mes = meses[fecha.getMonth()]
  const año = fecha.getFullYear()

  return `${dia} de ${mes} de ${año}`
}

export const doPostEvento = async (e) => {
  e.preventDefault()

  const [tituloInput, fechaInput, caraturaInput, ciudadInput, infoInput] =
    e.target

  const body = {
    titulo: tituloInput.value,
    fecha: formatearFecha(fechaInput.value),
    caratula: caraturaInput.value,
    ciudad: ciudadInput.value,
    info: infoInput.value
  }
  console.log('datos enviados', body)

  const token = localStorage.getItem('token')
  if (!token) {
    console.log('Usuario no autenticado')
    alert('Debes iniciar sesión para publicar un evento')
    return
  }

  try {
    const res = await API({
      endpoint: '/eventos',
      body,
      method: 'POST',
      token
    })
    console.log('respueta del servidor', res)

    if (res.ok) {
      alert('Evento publicado con éxito')

      navigate(e, { path: '/eventos', page: eventos })
    } else {
      console.log('Error al publicar el evento', res)
      alert('Hubo un problema al publicar el evento')
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
    alert('Ocurrió un error al intentar publicar el evento.')
  }
}

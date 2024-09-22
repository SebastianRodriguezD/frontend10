import { Button } from '../Button/Button'
import { FieldForm } from '../FieldForm/FieldForm'
import './postEventosForm.css'

export const postEventosForm = (form) => {
  form.className = 'eventos-form'
  form.innerHTML = `
    ${FieldForm({
      labelText: 'Nombre del evento',
      placeholder: 'Escribe el nombre del evento'
    })}
    ${FieldForm({
      labelText: 'Fecha del evento',
      type: 'date',
      placeholder: 'Selecciona la fecha'
    })}
    ${FieldForm({
      labelText: 'Imagen del evento',
      placeholder: 'URL de la imagen (obligatorio)'
    })}
    ${FieldForm({
      labelText: 'Ciudad del evento',
      placeholder: 'Escribe la ciudad'
    })}
      ${FieldForm({
        labelText: 'Descripción breve del evento',
        isTextarea: true,
        maxlength: 150,
        required: false,
        placeholder: 'Máximo 150 caractecres'
      })}
  `
  form.append(
    Button({ text: 'Publicar Evento', fnc: () => {}, className: 'button-post' })
  )
}

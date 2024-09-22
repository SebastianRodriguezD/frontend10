import { Button } from '../Button/Button'
import { FieldForm } from '../FieldForm/FieldForm'
import './RegistroForm.css'

export const RegistroForm = (form) => {
  form.className = 'registro-form'
  form.innerHTML = `
     ${FieldForm({
       labelText: 'Email',
       type: 'email',
       required: true,
       placeholder: 'Ingresa tu email',
       id: 'registro-email',
       name: 'email-registro'
     })}
    ${FieldForm({
      labelText: 'Contraseña',
      type: 'password',
      required: true,
      placeholder: 'Ingresa tu contraseña',
      id: 'registro-password',
      name: 'registro-password'
    })}
    ${FieldForm({
      labelText: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ingresa tu nombre',
      id: 'NombreRegistro',
      name: 'NombreRegistro'
    })}
     ${FieldForm({
       labelText: 'Aprellido',
       type: 'text',
       required: true,
       placeholder: 'Ingresa tu apellido',
       id: 'ApellidoRegistro',
       name: 'ApellidoRegistro'
     })}
 
   
  `
  form.append(
    Button({ text: 'Registrar', fnc: () => {}, className: 'button-registro' })
  )
}

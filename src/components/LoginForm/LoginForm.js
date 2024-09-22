import { Button } from '../Button/Button'
import { FieldForm } from '../FieldForm/FieldForm'
import './LoginForm.css'

export const LoginForm = (form) => {
  form.className = 'login-form'
  form.innerHTML = `
    ${FieldForm({
      labelText: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Ingresa tu email',
      id: 'emailLogin',
      name: 'EmailLogin'
    })}
    ${FieldForm({
      labelText: 'Contraseña',
      type: 'password',
      required: true,
      placeholder: 'Ingresa tu contraseña',
      id: 'ContraseñaLogin',
      name: 'ContraseñaLogin'
    })}
    
  `
  form.append(
    Button({ text: 'Iniciar sesión', fnc: () => {}, className: 'button-login' })
  )
}

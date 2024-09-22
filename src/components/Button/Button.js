import './Button.css'
export const Button = ({ text, fnc, className = '' }) => {
  const button = document.createElement('button')
  button.classList.add('main-button')

  // Añadir la clase solo si className no está vacío
  if (className) {
    button.classList.add(className)
  }

  button.textContent = text
  button.addEventListener('click', fnc)
  return button
}

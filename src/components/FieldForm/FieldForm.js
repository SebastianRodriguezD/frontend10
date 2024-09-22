import './FieldForm.css'

export const FieldForm = ({
  labelText,
  type = 'text',
  required = true,
  placeholder,
  isTextarea = false,
  maxlength,
  id, // Nuevo parámetro opcional para ID
  name // Nuevo parámetro opcional para name
}) => {
  // Generar un id y name único basado en labelText si no se proporcionan
  const fieldId = id || labelText.replace(/\s+/g, '-').toLowerCase()
  const fieldName = name || fieldId

  return `
    <div class="field-form">
      <label for="${fieldId}">${labelText}</label>
      ${
        isTextarea
          ? `<textarea id="${fieldId}" name="${fieldName}" ${
              placeholder ? `placeholder='${placeholder}'` : ''
            } ${maxlength ? `maxlength='${maxlength}'` : ''} ${
              required ? 'required' : ''
            }></textarea>`
          : `<input id="${fieldId}" name="${fieldName}" type='${type}' ${
              placeholder ? `placeholder='${placeholder}'` : ''
            } ${required ? 'required' : ''} />`
      }
    </div>`
}

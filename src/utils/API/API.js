const url = 'https://backend10.vercel.app/'

export const API = async ({
  endpoint,
  method = 'GET',
  body,
  isJSON = true,
  token = null
}) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  isJSON ? (headers['Content-type'] = 'application/json') : null

  const res = await fetch(url + endpoint, {
    body: isJSON ? JSON.stringify(body) : body,
    method,
    headers
  })

  // Verifica si la respuesta está OK antes de procesarla
  const data = await res.json()

  // Retorna tanto el estado de la respuesta como los datos
  return { ok: res.ok, status: res.status, data }
}

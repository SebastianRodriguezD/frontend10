const url = 'http://localhost:3000'

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

  const data = await res.json()

  return { ok: res.ok, status: res.status, data }
}

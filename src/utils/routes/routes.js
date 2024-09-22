import { eventos } from '../../pages/Eventos/Eventos'
import { Home } from '../../pages/Home/Home'
import { Login } from '../../pages/Login/Login'
import { postEventos } from '../../pages/PostEventos/postEventos'

export const routes = [
  { path: '/home', text: 'Home', page: Home },
  { path: '/eventos', text: 'Eventos', page: eventos },
  { path: '/postEventos', text: 'Publicar Evento', page: postEventos },
  { path: '/login', text: 'Login', page: Login }
]

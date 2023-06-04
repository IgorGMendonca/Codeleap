import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/routes/router';

import './global.scss';

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}


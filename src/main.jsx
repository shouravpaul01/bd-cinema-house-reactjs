import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import Providers from './providers/Providers'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
  
)

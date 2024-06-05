<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/Routes";
import { RouterProvider } from "react-router-dom";
import Providers from "./providers/Providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);
=======
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
>>>>>>> bcfcce7bc1edc90517adfaee3cd2fcdce67708a0

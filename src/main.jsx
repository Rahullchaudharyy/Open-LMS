import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from './Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './Components/Auth.jsx'
import LandingPage from './Components/LandingPage.jsx'
import Dashboard from './Components/Dashboard.jsx'

const Router = createBrowserRouter([
  {
    path:'/',
    element:<LandingPage/>
  },
  {

    path:'/auth',
    element:<Auth/>
  },
  {

    path:'/home',
    element:<Dashboard/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
<RouterProvider router={Router}>

    <App />
</RouterProvider>

  </Provider>
)

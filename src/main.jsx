import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Logs from "./Logs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "logs",
    element: <Logs />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />
    /*<App />*/
  ,
)

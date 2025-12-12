import { RouterProvider } from 'react-router-dom'
import './App.css'
import {router} from "./router/router.tsx";
import {AuthProvider} from "@/app/auth-context/AuthProvider.tsx";

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App

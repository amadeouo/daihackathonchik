import { RouterProvider } from 'react-router-dom'
import './App.css'
import {router} from "./router/router.tsx";

export const App = () => <RouterProvider router={router} />

export default App

import { createBrowserRouter } from 'react-router-dom'
import { Home } from "@/pages/home/ui";
import {Login} from "@/pages/login/ui";
import {RequireAuth} from "@/app/require-auth/RequireAuth.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element:
      <RequireAuth>
        <Home />
      </RequireAuth>,
    children: [
      {
        index: true,
        path: 'main',
        element: '',
      },
      {
        path: 'search',
        element: '',
      },
      {
        path: 'profile',
        element: '',
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
  }
])
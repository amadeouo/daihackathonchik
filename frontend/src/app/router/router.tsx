import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from "@/pages/main-page/ui";
import {Login} from "@/pages/login-page/ui";
import {AppLayout} from "@/widgets/app-layout/ui/AppLayout";
import {RequireRoute} from "@/app/require-route/RequireRoute.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireRoute> <AppLayout /> </RequireRoute>,
    children: [
      {
        path: 'home',
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
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <Login />,
  }
])
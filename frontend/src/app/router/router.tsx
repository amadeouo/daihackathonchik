import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from "@/pages/main-page/ui";
import { Login } from "@/pages/login-page/ui";
import { AppLayout } from "@/widgets/app-layout/ui/AppLayout";
import { RequireRoute } from "@/app/require-route/RequireRoute.tsx";
import { Hackathons } from "@/pages/hackathons-page/ui";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireRoute> <AppLayout /> </RequireRoute>,
    children: [
      {
        path: 'hackathons',
        element: <Hackathons />,
      },
      {
        path: 'hackathons/:id',
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
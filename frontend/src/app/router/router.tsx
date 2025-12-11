import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: '',
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
    path: '/auth'
  }
])
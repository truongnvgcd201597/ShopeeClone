import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductList from './pages/ProductList'
import RegisterLayout from './pages'

export default function useRouteElement() {
  const useRouteElement = useRoutes([
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '',
      element: <ProductList />
    }
  ])
  return useRouteElement
}

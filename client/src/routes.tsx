import GlobalLayout from './pages/_layout'
import Index from './pages/index'
import CartIndex from './pages/cart/index'
import ProductsIndex from './pages/products/index'
import ProductsId from './pages/products/detail'
import Payment from './pages/payment'
import Admin from './pages/admin'

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true },
      { path: '/cart', element: <CartIndex />, index: true },
      { path: '/products', element: <ProductsIndex />, index: true },
      { path: '/products/:id', element: <ProductsId /> },
      { path: '/payment', element: <Payment />, index: true },
      { path: '/admin', element: <Admin />, index: true },
    ],
  },
]

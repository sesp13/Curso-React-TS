import {
  EditProduct,
  action as editProductAction,
  loader as editProductLoader,
} from './views/EditProduct';
import { NewProduct, action as newProductAction } from './views/NewProduct';
import { Products, loader as productsLoader } from './views/Products';

import { Layout } from './layouts/Layout';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: 'productos/nuevo',
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: 'productos/:id/editar', // Resource Oriented Design Pattern
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
    ],
  },
]);

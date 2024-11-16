import { Form, useNavigate } from 'react-router-dom';

import { Product } from '../types';
import { formatCurrency } from '../utils';

type ProductDetailsProps = {
  product: Product;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const navigate = useNavigate();

  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {isAvailable ? 'Disponible' : 'No disponible'}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/productos/${product.id}/editar`)}
            className="bg-indigo-600 rounded-lg w-full 
              font-bold text-sm text-white p-2 uppercase text-center"
          >
            Editar
          </button>
          <Form className="w-full" method='POST'>
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 rounded-lg w-full 
              font-bold text-sm text-white p-2 uppercase text-center"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};

import { OrderItem } from '../types';
import { formatCurrency } from '../helpers';
import { useMemo } from 'react';

type OrderTotalsProps = {
  order: OrderItem[];
};

export const OrderTotals = ({ order }: OrderTotalsProps) => {
  const subtotalAmount = useMemo(() => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [order]);

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y propina</h2>
        <p>
          Subtotal a pagar: {''}
          <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
        </p>
        <p>
          Propina: {''}
          
        </p>
        <p>
          Total a pagar: {''}
          <span className="font-bold">$0</span>
        </p>
      </div>
      <button></button>
    </>
  );
};

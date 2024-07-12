import { MenuItem, OrderItem } from '../types';

import { useState } from 'react';

export const useOrder = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);

  const addItem = (item: MenuItem) => {
    const itemExists = order.find((orderItem) => orderItem.id === item.id);
    if (itemExists) {
      const updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
      setOrder(updatedOrder);
    } else {
      const newItem: OrderItem = { ...item, quantity: 1 };
      setOrder([...order, newItem]);
    }
  };

  const removeItem = (id: MenuItem['id']) => {
    setOrder(order.filter((item) => item.id !== id));
  };

  return { addItem, removeItem, order };
};

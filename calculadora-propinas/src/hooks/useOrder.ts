import { MenuItem, OrderItem } from '../types';

import { useState } from 'react';

export const useOrder = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);

  const addItem = (item: MenuItem) => {
    console.log(item);
  };

  return { addItem };
};

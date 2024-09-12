import { Guitar } from '../types';
import { db } from '../data/db';

export type CartActions =
  | { type: 'add-to-cart'; payload: { item: Guitar } }
  | { type: 'remove-from-cart'; payload: { id: Guitar['id'] } }
  | { type: 'decrease-quantity'; payload: { id: Guitar['id'] } }
  | { type: 'increase-quantity'; payload: { id: Guitar['id'] } }
  | { type: 'clear-cart' };

export type CartState = {
  data: Guitar[];
  cart: CartState[];
};

export const initialState: CartState = {
  data: db,
  cart: [],
};

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
): CartState => {
  if (action.type === 'add-to-cart') {
    return {
      ...state,
    };
  }
  if (action.type === 'remove-from-cart') {
    return {
      ...state,
    };
  }
  if (action.type === 'decrease-quantity') {
    return {
      ...state,
    };
  }
  if (action.type === 'increase-quantity') {
    return {
      ...state,
    };
  }
  if (action.type === 'clear-cart') {
    return {
      ...state,
    };
  }

  return { ...state };
};

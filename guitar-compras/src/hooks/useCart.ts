import { IGuitar, IGuitarCart } from "../models";
import { useEffect, useMemo, useState } from "react";

import { db } from '../data/db.js'

export const useCart = () => {
  const initialCart = (): IGuitarCart[] => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart
      ? (JSON.parse(localStorageCart) as IGuitarCart[])
      : [];
  };


  const [data] = useState<IGuitarCart[]>(db);
  const [cart, setCart] = useState<IGuitarCart[]>(initialCart);

  useEffect(() => {
    saveLocalStorage();
  }, [cart]);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  function addToCart(item: IGuitar) {
    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      const itemForCart: IGuitarCart = { ...item, quantity: 1 };
      setCart([...cart, itemForCart]);
    }
    saveLocalStorage();
  }

  function removeFromCart(elementId: string) {
    setCart(cart.filter((guitar) => guitar.id !== elementId));
  }

  function increaseQuantity(elementId: string) {
    const updatedCart = cart.map((items) => {
      if (items.id === elementId && items.quantity < MAX_ITEMS) {
        items.quantity++;
      }
      return items;
    });
    setCart(updatedCart);
  }
  function decreaseQuantity(elementId: string) {
    const updatedCart = cart.map((items) => {
      if (items.id === elementId && items.quantity > MIN_ITEMS) {
        items.quantity--;
      }
      return items;
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

    // State derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(
      () =>
        cart.reduce((acum: number, currentItem: IGuitarCart) => {
          return acum + currentItem.quantity * currentItem.price;
        }, 0),
      [cart]
    );

  return {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    data,
    addToCart,
    clearCart,
    isEmpty,
    cartTotal
  }
};

import { IGuitar, IGuitarCart } from './models';
import { useEffect, useState } from 'react';

import { Guitar } from './components/Guitar';
import { Header } from './components/Header';
import { db } from './data/db.js';

function App() {
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

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;

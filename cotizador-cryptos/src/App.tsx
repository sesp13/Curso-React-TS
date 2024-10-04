import { CryptoPriceDisplay } from './components/CryptoPriceDisplay';
import { CryptoSearchForm } from './components/CryptoSearchForm';
import { useCryptoStore } from './store';
import { useEffect } from 'react';

function App() {
  const fecthCryptos = useCryptoStore((state) => state.fetchCryptos);

  useEffect(() => {
    fecthCryptos();
  }, []);

  return (
    <div className="container">
      <h1 className="app-title">
        Cotizador de <span>Criptomonedas</span>
      </h1>
      <div className="content">
        <CryptoSearchForm />
        <CryptoPriceDisplay />
      </div>
    </div>
  );
}

export default App;

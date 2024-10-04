import { Spinner } from './Spinner/Spinner';
import { useCryptoStore } from '../store';
import { useMemo } from 'react';

export const CryptoPriceDisplay = () => {
  const result = useCryptoStore((state) => state.result);
  const isLoading = useCryptoStore((state) => state.isLoading);
  const hasResult = useMemo(() => Object.values(result).length !== 0, [result]);

  return (
    <div className="result-wrapper">
      {isLoading ? (
        <Spinner />
      ) : (
        hasResult && (
          <>
            <h2>Cotización</h2>
            <div className="result">
              <img
                src={`https://cryptocompare.com/${result.IMAGEURL}`}
                alt="Imagen Criptomoneda"
              />
              <div>
                <p>
                  El precio es de: <span>{result.PRICE}</span>
                </p>
                <p>
                  El Precio más alto del día: <span>{result.HIGHDAY}</span>
                </p>
                <p>
                  El Precio más Bajo del día: <span>{result.LOWDAY}</span>
                </p>
                <p>
                  Variación últimas 24 horas:{' '}
                  <span>{result.CHANGEPCT24HOUR}</span>
                </p>
                <p>
                  Última actualización: <span>{result.LASTUPDATE}</span>
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

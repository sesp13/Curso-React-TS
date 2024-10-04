import { CryptoCurrency, CryptoPrice, Pair } from './types';
import { fetchCurrentCryptoPrice, getCryptos } from './services/CryptoService';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  result: CryptoPrice;
  isLoading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    result: {} as CryptoPrice,
    isLoading: false,
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({
        cryptoCurrencies,
      }));
    },
    fetchData: async (pair) => {
      set(() => ({ isLoading: true }));
      const result = await fetchCurrentCryptoPrice(pair);
      set(() => ({ result, isLoading: false }));
    },
  }))
);

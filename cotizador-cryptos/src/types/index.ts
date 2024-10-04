import {
  CryptoCurrencyResponseSchema,
  CryptoPriceSchema,
  CurrencySchema,
  PairSchema,
} from '../schema/crypto-schema';

import { z } from 'zod';

export type Currency = z.infer<typeof CurrencySchema>;

export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>;

export type Pair = z.infer<typeof PairSchema>;

export type CryptoPrice = z.infer<typeof CryptoPriceSchema>
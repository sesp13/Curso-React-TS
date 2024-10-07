import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponseSchema,
  SearchFilterSchema,
} from '../utils/recipes-schema';

import { z } from 'zod';

export type CategoriesResponse = z.infer<typeof CategoriesAPIResponseSchema>;

export type SearchFilter = z.infer<typeof SearchFilterSchema>;

export type DrinksResponse = z.infer<typeof DrinksAPIResponseSchema>;

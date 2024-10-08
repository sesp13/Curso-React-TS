import {
  CategoriesAPIResponseSchema,
  DrinkAPIResponseSchema,
  DrinksAPIResponseSchema,
  RecipeAPIResponseSchema,
  SearchFilterSchema,
} from '../utils/recipes-schema';

import { z } from 'zod';

export type CategoriesResponse = z.infer<typeof CategoriesAPIResponseSchema>;

export type SearchFilter = z.infer<typeof SearchFilterSchema>;

export type DrinksResponse = z.infer<typeof DrinksAPIResponseSchema>;

export type Drink = z.infer<typeof DrinkAPIResponseSchema>;

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>
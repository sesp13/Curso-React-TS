import { CategoriesResponse, DrinksResponse, SearchFilter } from '../types';
import { getCategories, getRecipes } from '../services/RecipeService';

import { StateCreator } from 'zustand';

export type RecipesSliceType = {
  categories: CategoriesResponse;
  drinks: DrinksResponse;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchRecipes: async (filters: SearchFilter) => {
    const drinks = await getRecipes(filters);
    set(() => ({ drinks }));
  },
});

import {
  CategoriesResponse,
  Drink,
  DrinksResponse,
  Recipe,
  SearchFilter,
} from '../types';
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from '../services/RecipeService';

import { StateCreator } from 'zustand';

export type RecipesSliceType = {
  categories: CategoriesResponse;
  drinks: DrinksResponse;
  selectedRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink['idDrink']) => Promise<void>;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  selectedRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchRecipes: async (filters: SearchFilter) => {
    const drinks = await getRecipes(filters);
    set(() => ({ drinks }));
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id);
    set(() => ({ selectedRecipe, modal: true }));
  },
  closeModal: () => {
    set(() => ({ modal: false, selectedRecipe: {} as Recipe }));
  },
});

import { RecipesSliceType, createRecipesSlice } from './recipeSlice';

import { Recipe } from '../types';
import { StateCreator } from 'zustand';

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe['idDrink']) => boolean;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipesSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
    }

    createRecipesSlice(set, get, api).closeModal();
  },
  favoriteExists: (id: Recipe['idDrink']) =>
    get().favorites.some((favorite) => favorite.idDrink === id),
});

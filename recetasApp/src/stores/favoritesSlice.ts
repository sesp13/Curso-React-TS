import {
  NotificationSliceType,
  createNotificationSlice,
} from './notificationSlice';
import { RecipesSliceType, createRecipesSlice } from './recipeSlice';

import { Recipe } from '../types';
import { StateCreator } from 'zustand';

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe['idDrink']) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipesSliceType & NotificationSliceType,
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
      createNotificationSlice(set, get, api).showNotification({
        text: 'El favorito fue eliminado',
        error: true,
      });
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: 'El favorito fue agregado',
        error: false,
      });
    }

    createRecipesSlice(set, get, api).closeModal();
    localStorage.setItem('favorites', JSON.stringify(get().favorites));
  },
  favoriteExists: (id: Recipe['idDrink']) =>
    get().favorites.some((favorite) => favorite.idDrink === id),
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      set(() => ({
        favorites: JSON.parse(storedFavorites),
      }));
    }
  },
});

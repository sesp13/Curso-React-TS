import { FavoritesSliceType, createFavoritesSlice } from './favoritesSlice';
import { RecipesSliceType, createRecipesSlice } from './recipeSlice';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAppStore = create<RecipesSliceType & FavoritesSliceType>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
  }))
);

import { RecipesSliceType, createRecipesSlice } from './recipeSlice';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAppStore = create<RecipesSliceType>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
  }))
);

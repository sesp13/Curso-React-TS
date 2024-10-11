import { DrinkCard } from '../components/DrinkCard';
import { useAppStore } from '../stores/useAppStore';
import { useMemo } from 'react';

export const FavoritesPage = () => {
  const favorites = useAppStore((state) => state.favorites);

  const hasFavorites = useMemo(() => favorites.length, [favorites]);

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>
      {hasFavorites ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10
              gap-10
              "
        >
          {favorites.map((recipe) => (
            <DrinkCard drink={recipe} key={recipe.idDrink} />
          ))}
        </div>
      ) : 
        <p className='my-10 text-center text-2xl'>Los favoritos se mostrarán aquí</p>
      }
    </>
  );
};

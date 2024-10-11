import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { SearchFilter } from '../types';
import { useAppStore } from '../stores/useAppStore';

export const Header = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilter>({
    ingredient: '',
    category: '',
  });

  const { pathname } = useLocation();
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);
  const categories = useAppStore((state) => state.categories);
  const showNotification = useAppStore((state) => state.showNotification);

  const isHome = useMemo(() => pathname === '/', [pathname]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    await searchRecipes(searchFilters);
  };

  return (
    <header
      className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" className="w-32" alt="Logotipo" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-500 uppercase font-bold'
                  : 'text-white uppercase font-bold'
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to={'/favoritos'}
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-500 uppercase font-bold'
                  : 'text-white uppercase font-bold'
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            action=""
            className="md:1/2 2xl:w-1/3 my-32 p-10 bg-orange-400 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o ingredientes
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o ingrediente: Ej Vodka. Tequila Coffee"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoría
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="">-- Seleccione --</option>
                {categories.drinks.map((drink) => (
                  <option key={drink.strCategory} value={drink.strCategory}>
                    {drink.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Recetas"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900
               text-white w-full p-2 rounded-lg uppercase font-extrabold"
            />
          </form>
        )}
      </div>
    </header>
  );
};

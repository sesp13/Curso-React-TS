import { categories } from '../data/categories';
import { useState } from 'react';

export const Form = () => {
  const [activity, setActivity] = useState({
    category: 1,
    name: '',
    calories: 0,
  });

  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.id]: e.target.value });
  };

  return (
    <form className="space-y-5 bg-white p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:{' '}
        </label>
        <select
          name=""
          id="category"
          className="border border-slate-300 rounded-lg w-full bg-white p-2"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:{' '}
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: Comida, Jugo de Naranja, Ensalada, Ejercicio: Pesa Bicicleta "
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:{' '}
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias Ej: 300 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value="Guardar"
        className="bg-gray-800 hover:bg-gray-900 font-bold w-full uppercase text-white p-3"
      />
    </form>
  );
};

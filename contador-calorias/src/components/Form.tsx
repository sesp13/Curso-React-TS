import { categories } from '../data/categories';

export const Form = () => {
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
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="font-bold">
          Actividad:{' '}
        </label>
        <input
          type="text"
          id="activity"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: Comida, Jugo de Naranja, Ensalada, Ejercicio: Pesa Bicicleta "
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

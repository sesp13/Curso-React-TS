import { ActivityActions, ActivityState } from '../reducer/activityReducer';
import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from 'react';

import { Activity } from '../types';
import { categories } from '../data/categories';
import { v4 as uuidv4 } from 'uuid';

export type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialForm: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0,
};

export const Form = ({ dispatch, state }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialForm);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = (): boolean => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'save-activity', payload: { newActivity: activity } });
    // Reset form
    setActivity({ ...initialForm, id: uuidv4() });
  };

  return (
    <form
      className="space-y-5 bg-white p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
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
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar ejercicio'}
        className="bg-gray-800 hover:bg-gray-900 font-bold w-full uppercase text-white p-3 disabled:opacity-10"
        disabled={!isValidActivity()}
      />
    </form>
  );
};

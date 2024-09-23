import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DraftExpense, Value } from '../types';

import DatePicker from 'react-date-picker';
import { ErrorMessage } from './ErrorMessage';
import { categories } from '../data/categories';
import { useBudget } from '../hooks/useBudget';

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  });

  const [error, setError] = useState('');
  const [previousAmount, setPreviousAmount] = useState(0);

  const { state, dispatch, remainingBudget } = useBudget();

  useEffect(() => {
    if (state.editingid) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingid
      )[0];
      setExpense(editingExpense);
      setPreviousAmount(editingExpense.amount);
    }
  }, [state.editingid]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ['amount'].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value });
  };

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Validar que no me pase del límite
    if (expense.amount - previousAmount > remainingBudget) {
      setError('Presupuesto rebasado');
      return;
    }

    // Agregar o actualizar el gasto
    if (state.editingid) {
      dispatch({
        type: 'update-expense',
        payload: { expense: { ...expense, id: state.editingid } },
      });
    } else {
      dispatch({ type: 'add-expense', payload: { expense } });

      // Reiniciar state
      setExpense({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date(),
      });

      setPreviousAmount(0);
    }

    dispatch({ type: 'close-modal' });
  };

  return (
    <form className="space-y-5" onSubmit={handleSumbit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingid ? 'Guardar Cambios' : 'Nuevo Gasto'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:{' '}
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:{' '}
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la cantidad del gasto, ej: $300"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:{' '}
        </label>
        <select
          name="category"
          id="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha Gasto:{' '}
        </label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        value={state.editingid ? 'Guardar Cambios' : 'Registrar Gasto'}
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
      />
    </form>
  );
};

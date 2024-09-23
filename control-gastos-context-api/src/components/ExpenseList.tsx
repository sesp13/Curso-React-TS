import { ExpenseDetail } from './ExpenseDetail';
import { useBudget } from '../hooks/useBudget';
import { useMemo } from 'react';

export const ExpenseList = () => {
  const { state } = useBudget();

  const expensesFiltered = useMemo(() => {
    if (state.currentCategory !== '') {
      return state.expenses.filter(
        (expense) => expense.category === state.currentCategory
      );
    } else {
      return state.expenses;
    }
  }, [state.currentCategory, state.expenses]);

  const isEmpty = useMemo(
    () => expensesFiltered.length === 0,
    [expensesFiltered]
  );
  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-5">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">
            Listado de Gastos
          </p>

          {expensesFiltered.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};

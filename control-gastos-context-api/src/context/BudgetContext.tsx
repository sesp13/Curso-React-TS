import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState,
} from '../reducers/budgetReducer';
import { Dispatch, ReactNode, createContext, useMemo, useReducer } from 'react';

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  remainingBudget: number;
};

type BudgetProviderProps = { children: ReactNode };

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((acum, expense) => acum + expense.amount, 0),
    [state.expenses]
  );

  const remainingBudget = useMemo(
    () => state.budget - totalExpenses,
    [state.budget, totalExpenses]
  );

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, remainingBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

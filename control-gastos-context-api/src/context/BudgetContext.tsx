import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState,
} from '../reducers/budgetReducer';
import { Dispatch, ReactNode, createContext, useReducer } from 'react';

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
};

type BudgetProviderProps = { children: ReactNode };

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

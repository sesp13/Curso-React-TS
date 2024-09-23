import { Category, DraftExpense, Expense } from '../types';

import { v4 as uuidv4 } from 'uuid';

export type BudgetActions =
  | { type: 'add-budget'; payload: { budget: number } }
  | { type: 'show-modal' }
  | { type: 'close-modal' }
  | { type: 'add-expense'; payload: { expense: DraftExpense } }
  | { type: 'remove-expense'; payload: { id: Expense['id'] } }
  | { type: 'get-expense-by-id'; payload: { id: Expense['id'] } }
  | { type: 'update-expense'; payload: { expense: Expense } }
  | { type: 'restart-app' }
  | { type: 'add-filter-category'; payload: { id: Category['id'] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingid: Expense['id'];
  currentCategory: Category['id'];
};

const initialBudget = () =>
  localStorage.getItem('budget') ? +localStorage.getItem('budget')! : 0;

const initialExpenses = (): Expense[] =>
  localStorage.getItem('expenses')
    ? JSON.parse(localStorage.getItem('expenses')!)
    : [];

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingid: '',
  currentCategory: '',
};

const createExpense = (draft: DraftExpense): Expense => {
  return {
    ...draft,
    id: uuidv4(),
  };
};
export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
): BudgetState => {
  if (action.type === 'add-budget') {
    return { ...state, budget: action.payload.budget };
  }

  if (action.type === 'show-modal') {
    return { ...state, modal: true };
  }

  if (action.type === 'close-modal') {
    return { ...state, modal: false, editingid: '' };
  }

  if (action.type === 'add-expense') {
    const newExpense: Expense = createExpense(action.payload.expense);
    return { ...state, expenses: [...state.expenses, newExpense] };
  }

  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }

  if (action.type === 'get-expense-by-id') {
    return {
      ...state,
      editingid: action.payload.id,
      modal: true,
    };
  }

  if (action.type === 'update-expense') {
    return {
      ...state,
      editingid: '',
      modal: false,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.expense.id) {
          return { ...action.payload.expense };
        } else {
          return { ...expense };
        }
      }),
    };
  }

  if (action.type === 'restart-app') {
    return { ...initialState, expenses: [], budget: 0 };
  }

  if (action.type === 'add-filter-category') {
    return { ...state, currentCategory: action.payload.id };
  }

  return state;
};

import { StateCreator } from 'zustand';

export type INotification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationSliceType = {
  notification: INotification;
  showNotification: (payload: Pick<INotification, 'text' | 'error'>) => void;
  closeNotification: () => void;
};

const initialNotification: INotification = {
  text: '',
  error: false,
  show: false,
};

export const createNotificationSlice: StateCreator<NotificationSliceType> = (
  set,
  get
) => ({
  notification: {
    ...initialNotification,
  },
  showNotification: (payload) => {
    set(() => ({
      notification: { show: true, error: payload.error, text: payload.text },
    }));
    setTimeout(() => {
      get().closeNotification();
    }, 5000);
  },
  closeNotification: () => {
    set(() => ({ notification: { ...initialNotification } }));
  },
});

import { ConfirmToken, UserRegistrationForm } from '../types/';

import api from '@/lib/axios';
import { isAxiosError } from 'axios';

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = '/auth/create-account';
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

export async function confirmAccount(formData: ConfirmToken) {
  try {
    const url = '/auth/confirm-account';
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

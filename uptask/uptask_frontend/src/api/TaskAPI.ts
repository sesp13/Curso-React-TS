import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { GenericMessageResponse } from '@/types/index';
import { Project, TaskFormData } from '../types';

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project['_id'];
};

export async function createTask({
  formData,
  projectId,
}: Pick<TaskAPI, 'formData' | 'projectId'>) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post<GenericMessageResponse>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
  }
}

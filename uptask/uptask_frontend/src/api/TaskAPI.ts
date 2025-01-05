import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import {
  GenericMessageResponse,
  GenericTaskResponse,
  Task,
} from '@/types/index';
import { Project, TaskFormData } from '../types';

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project['_id'];
  taskId: Task['_id'];
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

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.get<GenericTaskResponse>(url);
    return data.task;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
  }
}

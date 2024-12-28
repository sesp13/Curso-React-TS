import {
  dashboardProjectSchema,
  GenericProjectResponse,
  Project,
  ProjectFormData,
} from '@/types/index';
import api from '@/lib/axios';
import { isAxiosError } from 'axios';

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post('/projects', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api('/projects');
    const response = dashboardProjectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

export async function getProjectById(id: Project['_id']) {
  try {
    const { data } = await api(`/projects/${id}`);
    return data.project;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

type ProjectAPIType = {
  formData: ProjectFormData;
  projectId: Project['_id'];
};

export async function updateProject({ formData, projectId }: ProjectAPIType) {
  try {
    const { data } = await api.put<GenericProjectResponse>(
      `/projects/${projectId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

export async function deleteProject(id: Project['_id']) {
  try {
    const { data } = await api.delete<GenericProjectResponse>(
      `/projects/${id}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    }
  }
}

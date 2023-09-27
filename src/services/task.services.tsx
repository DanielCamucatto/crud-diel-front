import axios from 'axios';
import { Task } from '../../src/app/types';

const API_BASE_URL = 'http://localhost:3000';

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar a lista de tarefas', error);
    throw error;
  }
};

export const createTask = async (taskData: Task): Promise<Task> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar a tarefa', error);
    throw error;
  }
};


export const updateTask = async (taskData: Task): Promise<Task> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskData._id}`, taskData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar a tarefa', error);
      throw error;
    }
  };
  
  export const deleteTask = async (taskId: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    } catch (error) {
      console.error('Erro ao excluir a tarefa', error);
      throw error;
    }
  };
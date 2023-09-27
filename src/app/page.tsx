'use client'
import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskListView from './components/TaskView';
import { Task } from './types';
import { loadTasks, createTask } from '../services/task.services';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const handleLoadTasks = async () => {
      try {
        const data = await loadTasks();
        setTasks(data);
      } catch (error) {
        console.error('Erro ao carregar a lista de tarefas', error);
      }
    };

    // Chame a função para carregar tarefas ao montar o componente
    handleLoadTasks();
  }, []);

  const handleCreateTask = async (newTaskData: Task) => {
    try {
      const newTask = await createTask(newTaskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Erro ao criar a tarefa', error);
    }
  };

  return (
    <main>
      <TaskForm onSubmit={handleCreateTask} />
      <TaskListView tasksList={tasks} />
    </main>
  );
}

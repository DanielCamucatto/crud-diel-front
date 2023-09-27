'use client'
import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskListView from '../components/TaskView';
import { Task } from '../types';
import { loadTasks, createTask } from '../../services/task.services';
import styled from 'styled-components';
import { MantineProvider } from '@mantine/core';
import NavbarComponent from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeContainer = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0 auto;
`;

const MainContent = styled.main`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

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
    <MantineProvider>
      <NavbarComponent />
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      <HomeContainer>
        <MainContent>
          <TaskForm onSubmit={handleCreateTask} />
          <TaskListView tasksList={tasks} />
        </MainContent>
      </HomeContainer>
    </MantineProvider>
  );
}

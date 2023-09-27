import React, { useState, useEffect } from 'react';
import TaskModal from './Modal'; 
import { Task } from '../types';
import { loadTasks, updateTask, deleteTask, createTask } from '../../services/task.services';
import styled from 'styled-components';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled.li`
  background-color: #ffffff;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title2 = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const TaskTitle = styled.h3`
  margin: 0;
`;

const TaskDescription = styled.p`
  margin: 5px 0;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center; 
  margin-top: 10px; 
  gap: 15px;
`;

const TaskButton = styled.button`
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  &.edit {
    background-color: #191919;
  }

  &.delete {
    background-color: red;
  }
`;

const ButtonText = styled.span`
  margin-left: 5px;
`;

interface TaskListViewProps {
  tasksList: Task[];
}

const TaskListView: React.FC<TaskListViewProps> = ({ tasksList }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatarDataParaExibicao = (data: string): string => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear().toString().slice(-2);

    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await loadTasks();

        // Formate a data para o formato desejado aqui
        const tasksWithFormattedDate = data.map((task) => ({
          ...task,
          date: formatarDataParaExibicao(task.date),
        }));

        setTasks(tasksWithFormattedDate);
      } catch (error) {
        console.error('Erro ao carregar a lista de tarefas', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (editedTask: Task) => {
    try {
      const updatedTask = await updateTask(editedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao editar a tarefa', error);
    }
  };

  const handleCreateTask = async (newTaskData: Task): Promise<void> => {
    try {
      const newTask = await createTask(newTaskData);
      addTaskToList(newTask);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Erro ao criar a tarefa', error);
    }
  };

  const addTaskToList = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Erro ao excluir a tarefa', error);
    }
  };

  return (
    <Container>
      <Title2>Lista de Tarefas</Title2>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task._id}>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskDescription>{task.description}</TaskDescription>
            <p>Data: {task.date}</p>
            <p>Duração: {task.duration} minutos</p>
            <ButtonBox>
              <TaskButton className='edit' onClick={() => handleEditClick(task)}>
                <FontAwesomeIcon icon={faEdit} />
                <ButtonText>Editar</ButtonText>
              </TaskButton>
              <TaskButton className='delete' onClick={() => task._id && handleDeleteTask(task._id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
                <ButtonText>Excluir</ButtonText>
              </TaskButton>
            </ButtonBox>
          </TaskItem>
        ))}
      </TaskList>

      <TaskModal
        task={editingTask}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
      />
    </Container>
  );
};

export default TaskListView;

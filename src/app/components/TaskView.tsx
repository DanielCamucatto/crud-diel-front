import React, { useState, useEffect } from 'react';
import TaskModal from './Modal';
import { Task } from '../types';
import { loadTasks, updateTask, deleteTask, createTask } from '../../services/task.services';

interface TaskListViewProps {
  tasksList: Task[];
}

const TaskListView: React.FC<TaskListViewProps> = ({ tasksList}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error('Erro ao carregar a lista de tarefas', error);
      });
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
    // Atualize o estado 'tasks' com a nova tarefa
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
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Data: {task.date}</p>
            <p>Duração: {task.duration} minutos</p>
            <button onClick={() => handleEditClick(task)}>Editar</button>
            <button onClick={() => task._id && handleDeleteTask(task._id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <TaskModal
        task={editingTask}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default TaskListView;

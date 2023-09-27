// components/TaskDetail.tsx

import React from 'react';
import { Task } from '../types';

interface TaskDetailProps {
  task: Task; // Substitua 'Task' pelo tipo de objeto de tarefa em sua aplicação
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  return (
    <div>
      <h2>Detalhes da Tarefa</h2>
      <p>Título: {task.title}</p>
      <p>Descrição: {task.description}</p>
      <p>Data: {task.date}</p>
      <p>Duração: {task.duration} minutos</p>
    </div>
  );
};

export default TaskDetail;

import React from 'react';
import { Task } from '../types';
import { Paper, Text} from '@mantine/core';

interface TaskDetailProps {
  task: Task;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  return (
    <Paper bg="blue">
      <h2>Detalhes da Tarefa</h2>
      <Text>Título: {task.title}</Text>
      <Text>Descrição: {task.description}</Text>
      <Text>Data: {task.date}</Text>
      <Text>Duração: {task.duration} minutos</Text>
    </Paper>
  );
};

export default TaskDetail;

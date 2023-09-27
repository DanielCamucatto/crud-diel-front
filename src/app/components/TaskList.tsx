import React from 'react';
import { Task } from '../types';
import styled from 'styled-components';

const ListContainer = styled.div`
  background-color: #f0f !important;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListHeader = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ListContainer>
      <ListHeader>Lista de Tarefas</ListHeader>
      <ul>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            {task.title} - {task.date}
          </ListItem>
        ))}
      </ul>
    </ListContainer>
  );
};

export default TaskList;

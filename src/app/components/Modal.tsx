import React, { useState } from 'react';
import { Task } from '../types';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedTask: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onSubmit }) => {
  const [editedTask, setEditedTask] = useState<Task | null>(task);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedTask) {
      setEditedTask({ ...editedTask, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (editedTask) {
      onSubmit(editedTask);
      onClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <h2>{editedTask ? 'Editar Tarefa' : 'Criar Tarefa'}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Título</label>
        <input
          type="text"
          name="title"
          value={editedTask?.title || ''}
          onChange={handleInputChange}
        />
        {/* Adicione outros campos para edição */}
        <button onClick={handleSubmit}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default TaskModal;

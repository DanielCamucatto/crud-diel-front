// Componente TaskForm não precisa da prop 'addTaskToList'
import React, { useState } from 'react';
import { Task } from '../types';
import { createTask } from '@/services/task.services';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    date: '',
    duration: 0,
  });
  const [formErrors, setFormErrors] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async () => {
    // Realize a validação dos campos antes de submeter
    if (!task.title || !task.description || !task.date || task.duration <= 0) {
      setFormErrors('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      await onSubmit(task); // Chame a função onSubmit para criar a tarefa
      setTask({
        title: '',
        description: '',
        date: '',
        duration: 0,
      });
      setFormErrors(null);
    } catch (error) {
      console.error('Erro ao criar a tarefa', error);
    }
  };

  return (
    <div>
      <h2>Formulário de Tarefa</h2>
      <form onSubmit={handleSubmit}>
        {formErrors && <p style={{ color: 'red' }}>{formErrors}</p>}
        <div>
          <label>Título</label>
          <input type="text" name="title" value={task.title} onChange={handleChange} />
        </div>
        <div>
          <label>Descrição</label>
          <textarea name="description" value={task.description} onChange={handleChange} />
        </div>
        <div>
          <label>Data</label>
          <input type="date" name="date" value={task.date} onChange={handleChange} />
        </div>
        <div>
          <label>Duração (minutos)</label>
          <input type="number" name="duration" value={task.duration} onChange={handleChange} />
        </div>
        <button type="submit">Criar Tarefa</button>
      </form>
    </div>
  );
};

export default TaskForm;

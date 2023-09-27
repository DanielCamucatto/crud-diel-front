import React, { useState } from 'react';
import { Task } from '../types';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #191919;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #191919;
`;

const Button = styled.button`
  background-color: #191919;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

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
    if (!task.title || !task.description || !task.date || task.duration <= 0) {
      setFormErrors('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      const formattedTask = { ...task, date: formatarDataParaAPI(task.date) };
      await onSubmit(formattedTask);
      setTask({
        title: '',
        description: '',
        date: '',
        duration: 0,
      });
      setFormErrors(null);
      toast.success('Tarefa Criada com sucesso')
    } catch (error) {
      console.error('Erro ao criar a tarefa', error);
    }
  };

  const formatarDataParaAPI = (data: string): string => {
    if (!data) return '';
    const partesData = data.split('/');
    if (partesData.length === 3) {
      const [dia, mes, ano] = partesData;
      return `${ano}-${mes}-${dia}`;
    }
    return data;
  };

  return (
    <FormContainer>
      <FormTitle>Formulário de Tarefa</FormTitle>
      <form onSubmit={handleSubmit}>
        {formErrors && <ErrorMessage>{formErrors}</ErrorMessage>}
        <div>
          <Label>Título</Label>
          <Input type="text" name="title" value={task.title} onChange={handleChange} />
        </div>
        <div>
          <Label>Descrição</Label>
          <TextArea name="description" value={task.description} onChange={handleChange} />
        </div>
        <div>
          <Label>Data (dd/MM/yyyy)</Label>
          <Input type="text" name="date" value={task.date} onChange={handleChange} />
        </div>
        <div>
          <Label>Duração (minutos)</Label>
          <Input type="number" name="duration" value={task.duration} onChange={handleChange} />
        </div>
        <Button type="submit">Criar Tarefa</Button>
      </form>
    </FormContainer>
  );
};

export default TaskForm;

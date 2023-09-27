import React, { useState } from 'react';
import { Task } from '../types';
import styled from 'styled-components'; // Importe styled-components

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
    opacity: .7
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

  const formatarDataParaExibicao = (data: string): string => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear().toString().slice(-2);
  
    return `${dia}/${mes}/${ano}`;
  };
  
  const handleSubmit = async () => {
    if (!task.title || !task.description || !task.date || task.duration <= 0) {
      setFormErrors('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      await onSubmit(task); 
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
          <Label>Data</Label>
          <Input type="date" name="date" value={task.date ? formatarDataParaExibicao(task.date) : ''} onChange={handleChange} />
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

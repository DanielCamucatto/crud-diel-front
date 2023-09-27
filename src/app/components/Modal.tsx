import React, { useState } from 'react';
import { Task } from '../types';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editedTask: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onSubmit }) => {
  const [editedTaskData, setEditedTaskData] = useState<Task | null>(null);

  React.useEffect(() => {
    setEditedTaskData(task);
  }, [task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedTaskData) {
      setEditedTaskData({ ...editedTaskData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (editedTaskData) {
      onSubmit(editedTaskData);
      onClose();
    }
  };

  const modalStyles: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
    display: isOpen ? 'grid' : 'none',
    placeItems: 'center',
    width: '50%',
    height: '50%'

  };

  if (window.matchMedia('(max-width: 768px)').matches) {
    modalStyles.width = '90%'; 
  }

  const backdropStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9998,
    display: isOpen ? 'block' : 'none',
  };

  const formModal: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    gap: '10px',
  }

  const inputModal: React.CSSProperties = {
    background: '#c6c6c6',
    color: '#191919',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
  }

  const btnModal: React.CSSProperties = {
    padding: '10px',
    border: 'none', 
    borderRadius: '5px',
    cursor: 'pointer',
  }

  const btnDel: React.CSSProperties = {
    backgroundColor: 'red'
  }

  const btnDelHover: React.CSSProperties = {
    opacity: '.8',
  };

  const btnEdit: React.CSSProperties = {
    backgroundColor: '#191919'
  }

  const btnEditHover: React.CSSProperties = {
    opacity: '0.8'
  };

  return (
    <>
      <div style={backdropStyles} onClick={onClose}></div>
      <div style={modalStyles}>
        <form onSubmit={(e) => e.preventDefault()} style={formModal}>
          <label>Título</label>
          <input
            style={inputModal}
            type="text"
            name="title"
            value={editedTaskData?.title || ''}
            onChange={handleInputChange}
          />
          <label>Descrição</label>
          <input
            style={inputModal}
            type="text"
            name="description"
            value={editedTaskData?.description || ''}
            onChange={handleInputChange}
          />
          <label>Data</label>
          <input
            style={inputModal}
            type="text"
            name="date"
            value={editedTaskData?.date || ''}
            onChange={handleInputChange}
          />
          <label>Duração (minutos)</label>
          <input
            style={inputModal}
            type="number"
            name="duration"
            value={editedTaskData?.duration || ''}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit} style={{...btnModal, ...btnDel, ...btnDelHover}}>Salvar</button>
          <button onClick={onClose} style={{...btnModal, ...btnEdit, ...btnEditHover}}>Cancelar</button>
        </form>
      </div>
    </>
  );
};

export default TaskModal;

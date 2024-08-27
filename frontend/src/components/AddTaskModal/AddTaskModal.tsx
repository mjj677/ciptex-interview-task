import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

interface AddTaskModalProps {
  show: boolean;
  handleClose: () => void;
  tasks: { id: string; title: string; status: string }[];
  refreshTasks: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ show, handleClose, tasks, refreshTasks }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [taskId, setTaskId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !status) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      getNextTaskId();  
      await axios.post('http://localhost:3000/tasks', { taskId, title, status });
      refreshTasks();
      handleClose(); 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const getNextTaskId = () => {
    if (tasks.length === 0) return '1';
    const highestId = Math.max(...tasks.map(task => parseInt(task.id, 10)));
    return (highestId + 1).toString();
  };

  useEffect(() => {
    setTaskId(getNextTaskId());
  }, [show, tasks]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;

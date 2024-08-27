import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

interface AddTaskModalProps {
  show: boolean;
  handleClose: () => void;
  refreshTasks: () => void;
  taskId: string;
}

const DeleteTaskModal: React.FC<AddTaskModalProps> = ({
  show,
  handleClose,
  refreshTasks,
  taskId,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskId) {
      alert("No task ID provided.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      refreshTasks();
      handleClose();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete this task?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Button variant="danger" type="submit">
            Delete Task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteTaskModal;

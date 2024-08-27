import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

interface UpdateStatusModalProps {
    show: boolean;
    handleClose: () => void;
    taskId: string;
    currentStatus: string;
    refreshTasks: () => void;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
    show,
    handleClose,
    taskId,
    currentStatus,
    refreshTasks
}) => {
    const [status, setStatus] = useState(currentStatus);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:3000/tasks/${taskId}`, {
                status
            });
            refreshTasks();
            handleClose(); 
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Task Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="incomplete">Incomplete</option>
                            <option value="urgent">Urgent</option>
                            <option value="complete">Complete</option>
                            <option value="in-progress">In Progress</option>
                            <option value="pending">Pending</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Status
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateStatusModal;

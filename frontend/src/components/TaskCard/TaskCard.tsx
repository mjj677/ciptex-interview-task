import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './styles.module.css'
import UpdateStatusModal from '../UpdateStatusModal/UpdateStatusModal';

interface TaskCardProps {
    title: string;
    status: string;
    taskId: string;
    onDelete: (taskId: string) => void;
    refreshTasks: () => void;
}


const TaskCard: React.FC<TaskCardProps> = ({title, status, taskId, onDelete, refreshTasks}) => {

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleUpdateClick = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);

    return (
        <>
        <Card className={styles.card}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Status: {status}</Card.Text>
                <div className={styles.buttonWrapper}>
                <Button variant="success" className={styles.updateButton} onClick={handleUpdateClick}>Update</Button>
                <Button variant="danger" onClick={() => onDelete(taskId)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
        <UpdateStatusModal 
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        taskId={taskId}
        currentStatus={status}
        refreshTasks={refreshTasks}
        />
        </>
    );
}

export default TaskCard
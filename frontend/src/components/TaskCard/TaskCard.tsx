import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './styles.module.css'

interface TaskCardProps {
    title: string;
    status: string;
    taskId: string;
    onDelete: (taskId: string) => void;
}


const TaskCard: React.FC<TaskCardProps> = ({title, status, taskId, onDelete}) => {
    return (
        <Card className={styles.card}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Status: {status}</Card.Text>
                <div className={styles.buttonWrapper}>
                <Button variant="success" className={styles.updateButton}>Update</Button>
                <Button variant="danger" onClick={() => onDelete(taskId)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TaskCard
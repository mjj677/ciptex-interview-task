import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './styles.module.css'

interface TaskCardProps {
    title: string;
    status: string;
}


const TaskCard: React.FC<TaskCardProps> = ({title, status}) => {
    return (
        <Card className={styles.card}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{status}</Card.Text>
                <div className={styles.buttonWrapper}>
                <Button variant="success" className={styles.updateButton}>Update</Button>
                <Button variant="danger">Delete</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TaskCard
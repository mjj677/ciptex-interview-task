import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './styles.module.css'; // Ensure this is the right path

const AddTaskCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <Card className={styles.card}>
            <Card.Body>
                <Card.Title>Add New Task</Card.Title>
                <Card.Text>Click here to add a new task</Card.Text>
                <Button variant="primary" onClick={onClick}>
                    Add Task
                </Button>
            </Card.Body>
        </Card>
    );
};

export default AddTaskCard;

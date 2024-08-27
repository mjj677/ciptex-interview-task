import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import TaskCard from "../TaskCard/TaskCard";
import AddTaskCard from "../AddTaskCard/AddTaskCard";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";

interface Task {
  id: string;
  title: string;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchTasks = async () => {
    const response = await axios.get<Task[]>("http://localhost:3000/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTaskClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleDeleteTaskClick = () => setShowDeleteModal(true);

  const refreshTasks = () => {
    fetchTasks();
  }

  return (
    <div className={styles.container}>

        {tasks.map((task) => (
            <TaskCard key={task.id} title={task.title} status={task.status} />
        ))}
        <AddTaskCard onClick={handleAddTaskClick} />
        <AddTaskModal 
        show={showModal} 
        handleClose={handleCloseModal}
        tasks={tasks}
        refreshTasks={refreshTasks}
        />
        <DeleteTaskModal 
        show={showDeleteModal}
        handleClose={handleCloseModal}
        />
    </div>
  );
};

export default TaskList;

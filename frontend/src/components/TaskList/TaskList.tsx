import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import TaskCard from "../TaskCard/TaskCard";
import AddTaskCard from "../AddTaskCard/AddTaskCard";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";

interface Task {
  taskId: string;
  title: string;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const fetchTasks = async () => {
    const response = await axios.get<Task[]>("http://localhost:3000/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTaskClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDeleteTaskClick = (taskId: string) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const refreshTasks = async () => {
    await fetchTasks();

    setTasks((prevTasks) => [
      ...prevTasks.sort((a, b) => parseInt(b.taskId) - parseInt(a.taskId)),
    ]);
  };

  return (
    <div className={styles.container}>
      {tasks.map((task) => {
        console.log(task, "<<<<<<<<");
        return (
          <TaskCard
            key={task.taskId}
            title={task.title}
            status={task.status}
            taskId={task.taskId}
            onDelete={handleDeleteTaskClick}
          />
        );
      })}
      <AddTaskCard onClick={handleAddTaskClick} />
      <AddTaskModal
        show={showModal}
        handleClose={handleCloseModal}
        tasks={tasks}
        refreshTasks={refreshTasks}
      />
      <DeleteTaskModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        refreshTasks={refreshTasks}
        taskId={taskToDelete || ""}
      />
    </div>
  );
};

export default TaskList;

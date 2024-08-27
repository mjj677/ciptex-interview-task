import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WebSocketService from "./services/websocketService";
import TaskList from "./components/TaskList/TaskList";
import Header from "./components/Header/Header";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal";
import DeleteTaskModal from "./components/DeleteTaskModal/DeleteTaskModal";
import axios from "axios";

interface Task {
  taskId: string;
  title: string;
  status: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [wsService, setWsService] = useState<WebSocketService | null>(null);

  const fetchTasks = async () => {
    try {
    const response = await axios.get<Task[]>("http://localhost:3000/tasks");
    setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const ws = new WebSocketService("ws://localhost:3000");

    ws.onMessage((event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'task-update') {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.taskId === message.taskId ? { ...task, status: message.status } : task
          )
        );
      }
    });

    setWsService(ws);

    return () => {
      ws.closeConnection();
    };
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
    setTasks(prevTasks => [
      ...prevTasks.sort((a, b) => parseInt(b.taskId) - parseInt(a.taskId)),
    ]);
  };

  return (
    <div className="page-container">
      <Header />
      <TaskList
        tasks={tasks}
        onAddTaskClick={handleAddTaskClick}
        onDeleteTaskClick={handleDeleteTaskClick}
        refreshTasks={refreshTasks}
      />
      <AddTaskModal
        show={showModal}
        handleClose={handleCloseModal}
        tasks={tasks}
        refreshTasks={refreshTasks}
        wsService={wsService}
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

export default App;

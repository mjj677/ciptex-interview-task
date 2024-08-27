import styles from "./styles.module.css";
import TaskCard from "../TaskCard/TaskCard";
import AddTaskCard from "../AddTaskCard/AddTaskCard";

interface Task {
  taskId: string;
  title: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
  onAddTaskClick: () => void;
  onDeleteTaskClick: (taskId: string) => void;
  refreshTasks: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onAddTaskClick,
  onDeleteTaskClick,
  refreshTasks,
}) => {
  return (
    <div className={styles.container}>
      {tasks.map((task) => (
        <TaskCard
          key={task.taskId}
          title={task.title}
          status={task.status}
          taskId={task.taskId}
          onDelete={onDeleteTaskClick}
          refreshTasks={refreshTasks}
        />
      ))}
      <AddTaskCard onClick={onAddTaskClick} />
    </div>
  );
};

export default TaskList;

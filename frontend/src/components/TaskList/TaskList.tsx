import { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get<Task[]>('http://localhost:3000/tasks');
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  return (
    <div>
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} - {task.status}
        </li>
      ))}
    </ul>
    </div>
  );
};

export default TaskList;
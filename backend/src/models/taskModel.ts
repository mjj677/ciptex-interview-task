import { Task } from '../controllers/taskController'

export const validateCreateTask = (task: Task) => {
    const errors: string[] = [];
    if (!task.taskId) errors.push("Task ID is required");
    if (!task.title) errors.push("Title is required");
    if (!task.status) errors.push("Status is required");

    return errors;
}

export const validateUpdateTask = (status: string) => {
    const errors: string[] = [];
    if (!status) errors.push("Status is required");

    return errors;
}
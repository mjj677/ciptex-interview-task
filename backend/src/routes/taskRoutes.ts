import express from 'express'
import {getTasks, createTask, updateTask, deleteTask} from '../controllers/taskController'

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;
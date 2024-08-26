import { Request, Response } from 'express';
import dynamoDB from '../dynamodb';

const TableName = 'ciptex-task-system';

export const getTasks = async (req: Request, res: Response) => {
  const params = {
    TableName,
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    res.status(200).json(data.Items);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const createTask = async (req: Request, res: Response) => {
  const params = {
    TableName,
    Item: req.body,
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const params = {
    TableName,
    Key: { taskId },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': status },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const data = await dynamoDB.update(params).promise();
    res.status(200).json(data.Attributes);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  const params = {
    TableName,
    Key: { taskId },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

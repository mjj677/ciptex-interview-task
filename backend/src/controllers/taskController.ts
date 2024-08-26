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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const params = {
    TableName,
    Key: { id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': status },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const data = await dynamoDB.update(params).promise();
    res.status(200).json(data.Attributes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const params = {
    TableName,
    Key: { id },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

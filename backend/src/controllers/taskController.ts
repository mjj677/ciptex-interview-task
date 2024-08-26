import { Request, Response } from "express";
import dynamoDB from "../dynamodb";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { validateCreateTask, validateUpdateTask } from "../models/taskModel";

const TableName = "ciptex-task-system";

export interface Task {
  taskId: string;
  title: string;
  status: string;
}

const handleError = (res: Response, error: unknown): void => {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: "An unknown error occurred" });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const params: DocumentClient.ScanInput = {
    TableName,
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    res.status(200).json(data.Items || []);
  } catch (error) {
    handleError(res, error);
  }
};

export const createTask = async (
  req: Request<{}, {}, Task>,
  res: Response
): Promise<void> => {
  const validationErrors = validateCreateTask(req.body);

  if (validationErrors.length > 0) {
    res.status(400).json({ error: validationErrors.join(", ") });
    return;
  }

  const params: DocumentClient.PutItemInput = {
    TableName,
    Item: req.body,
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateTask = async (
  req: Request<{ taskId: string }, {}, { status: string }>,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;

  const validationErrors = validateUpdateTask(status);

  if (validationErrors.length > 0) {
    res.status(400).json({ error: validationErrors.join(", ") });
    return;
  }

  const params: DocumentClient.UpdateItemInput = {
    TableName,
    Key: { taskId },
    UpdateExpression: "set #status = :status",
    ExpressionAttributeNames: { "#status": "status" },
    ExpressionAttributeValues: { ":status": status },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await dynamoDB.update(params).promise();
    if (!data.Attributes) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(data.Attributes || {});
  } catch (error) {
    if (error instanceof Error && error.message.includes("Task not found")) {
      res.status(404).json({ error: "Task not found" });
    } else {
      handleError(res, error);
    }
  }
};

export const deleteTask = async (
  req: Request<{ taskId: string }>,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;

  const params: DocumentClient.DeleteItemInput = {
    TableName,
    Key: { taskId },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({ error: "Task not found" });
    } else {
      handleError(res, error);
    }
  }
};

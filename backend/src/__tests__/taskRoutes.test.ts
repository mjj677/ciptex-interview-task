import request from "supertest";
import express, { Express } from "express";
import taskRoutes from "../routes/taskRoutes";
import dynamoDB from "../dynamodb";

const app: Express = express();
app.use(express.json());
app.use("/tasks", taskRoutes);

jest.mock("../dynamodb");

describe("Task API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTask()", () => {
    it("should return 201 status", async () => {
      (dynamoDB.put as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      const response = await request(app).post("/tasks").send({
        taskId: "1",
        title: "Test Task",
        status: "pending",
      });

      expect(response.status).toBe(201);
    });

    it("should return correct message", async () => {
      (dynamoDB.put as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      const response = await request(app).post("/tasks").send({
        taskId: "1",
        title: "Test Task",
        status: "pending",
      });

      expect(response.body.message).toBe("Task created successfully");
    });

    it("should call DynamoDB put method once when creating a task", async () => {
      const putMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      (dynamoDB.put as jest.Mock).mockImplementation(putMock);

      await request(app).post("/tasks").send({
        taskId: "1",
        title: "Test Task",
        status: "pending",
      });

      expect(putMock).toHaveBeenCalledTimes(1);
    });

    it("should return an error when task creation fails", async () => {
      (dynamoDB.put as jest.Mock).mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error("DynamoDB Error")),
      });

      const response = await request(app).post("/tasks").send({
        taskId: "1",
        title: "Test Task",
        status: "pending",
      });

      expect(response.body.error).toBe("DynamoDB Error");
    });

    it("should return a 500 status when unsuccessful", async () => {
      (dynamoDB.put as jest.Mock).mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error("DynamoDB Error")),
      });

      const response = await request(app).post("/tasks").send({
        taskId: "1",
        title: "Test Task",
        status: "pending",
      });

      expect(response.status).toBe(500);
    });

    it("should return 400 status when required fields are missing", async () => {
      const response = await request(app).post("/tasks").send({
        taskId: "",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Task ID is required, Title is required, Status is required"
      );
    });
  });

  describe("getTasks()", () => {
    it("should return a 200 status on successful request", async () => {
      (dynamoDB.scan as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Items: [{ taskId: "1", title: "Test Task", status: "pending" }],
        }),
      });

      const response = await request(app).get("/tasks");

      expect(response.status).toBe(200);
    });

    it("should return an empty array when no tasks are present", async () => {
      (dynamoDB.scan as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Items: [],
        }),
      });

      const response = await request(app).get("/tasks");

      expect(response.body).toEqual([]);
    });

    it("should call DynamoDB scan method once when retrieving tasks", async () => {
      const scanMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Items: [{ taskId: "1", title: "Test Task", status: "pending" }],
        }),
      });

      (dynamoDB.scan as jest.Mock).mockImplementation(scanMock);

      await request(app).get("/tasks");

      expect(scanMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateTask()", () => {
    it("should return 200 status when successfully updating a task", async () => {
      (dynamoDB.update as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Attributes: { status: "completed" },
        }),
      });

      const response = await request(app).put("/tasks/1").send({
        status: "completed",
      });

      expect(response.status).toBe(200);
    });

    it("should return updated status when task is updated successfully", async () => {
      (dynamoDB.update as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Attributes: { status: "completed" },
        }),
      });

      const response = await request(app).put("/tasks/1").send({
        status: "completed",
      });

      expect(response.body.status).toBe("completed");
    });

    it("should return 400 status when no status field is provided", async () => {
      const response = await request(app).put("/tasks/1").send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Status is required");
    });

    it("should return 404 status when task ID is invalid", async () => {
      (dynamoDB.update as jest.Mock).mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error("Task not found")),
      });

      const response = await request(app).put("/tasks/invalid-id").send({
        status: "completed",
      });

      console.log(response.status, "<<<");
      console.log(response.body.error, "<<<");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Task not found");
    });

    it("should call DynamoDB update method once when updating a task", async () => {
      const updateMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Attributes: { status: "completed" },
        }),
      });

      (dynamoDB.update as jest.Mock).mockImplementation(updateMock);

      await request(app).put("/tasks/1").send({
        status: "completed",
      });

      expect(updateMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteTask()", () => {
    it("should return 200 status and message when successfully deleting a task", async () => {
      (dynamoDB.delete as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      const response = await request(app).delete("/tasks/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Task deleted successfully");
    });

    it("should return 404 status when task to delete does not exist", async () => {
      (dynamoDB.delete as jest.Mock).mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error("Task not found")),
      });

      const response = await request(app).delete("/tasks/invalid-id");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Task not found");
    });

    it("should return 500 status when delete operation fails", async () => {
      (dynamoDB.delete as jest.Mock).mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error("DynamoDB Error")),
      });

      const response = await request(app).delete("/tasks/1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("DynamoDB Error");
    });
  });
});

import request from "supertest";
import express from "express";
import taskRoutes from "../routes/taskRoutes";
import dynamoDB from "../dynamodb";

jest.mock("../dynamodb");

const app = express();
app.use(express.json());
app.use("/tasks", taskRoutes);

describe("Task API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTask()", () => {
    it("should return 201 status", async () => {
      const postMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      (dynamoDB.put as jest.Mock).mockImplementation(postMock);

      const response = await request(app).post("/tasks").send({
        id: "1",
        title: "Test Task",
        status: "pending",
      });

      expect(response.status).toBe(201);
    });
    it("should return correct message", async () => {
      const postMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      (dynamoDB.put as jest.Mock).mockImplementation(postMock);

      const response = await request(app).post("/tasks").send({
        id: "1",
        title: "Test Task",
        status: "pending",
      });

      expect(response.body.message).toBe("Task created successfully");
    });
    it("should call function one time when succesfully creating a task", async () => {
      const postMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      (dynamoDB.put as jest.Mock).mockImplementation(postMock);

      const response = await request(app).post("/tasks").send({
        id: "1",
        title: "Test Task",
        status: "pending",
      });

      expect(postMock).toHaveBeenCalledTimes(1);
    });

    it("should return an error when task creation fails", async () => {
      const postMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error("DynamoDB Error")),
      });

      (dynamoDB.put as jest.Mock).mockImplementation(postMock);

      const response = await request(app).post("/tasks").send({
        id: "1",
        title: "Test Task",
        status: "pending",
      });

      expect(response.body.error).toBe("DynamoDB Error");
    });
    it("should return a 500 status", async () => {
      const postMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error("DynamoDB Error")),
      });

      (dynamoDB.put as jest.Mock).mockImplementation(postMock);

      const response = await request(app).post("/tasks").send({
        id: "1",
        title: "Test Task",
        status: "pending",
      });

      expect(response.status).toBe(500);
    });
  });

  describe("getTasks()", () => {
    it("should return a 200 status on successful request", async () => {
      const scanMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Items: [{ id: "1", title: "Test Task", status: "pending" }],
        }),
      });

      (dynamoDB.scan as jest.Mock).mockImplementation(scanMock);

      const response = await request(app).get("/tasks");

      expect(response.status).toBe(200);
      expect(scanMock).toHaveBeenCalledTimes(1);
    });
    it("should return correct number of tasks", async () => {
      const scanMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Items: [{ id: "1", title: "Test Task", status: "pending" }],
        }),
      });

      (dynamoDB.scan as jest.Mock).mockImplementation(scanMock);

      const response = await request(app).get("/tasks");

      expect(response.body.length).toBe(1);
    });
    it("should call function one time when succesfully retrieving tasks", async () => {
      const scanMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Items: [{ id: "1", title: "Test Task", status: "pending" }],
        }),
      });

      (dynamoDB.scan as jest.Mock).mockImplementation(scanMock);

      expect(scanMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateTask()", () => {
    it("should update a task", async () => {
      const updateMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Attributes: { status: "completed" },
        }),
      });

      (dynamoDB.update as jest.Mock).mockImplementation(updateMock);

      const response = await request(app).put("/tasks/1").send({
        status: "completed",
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("completed");
      expect(updateMock).toHaveBeenCalledTimes(1);
    });
  });
  describe("deleteTask()", () => {
    it("should delete a task", async () => {
      const deleteMock = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      (dynamoDB.delete as jest.Mock).mockImplementation(deleteMock);

      const response = await request(app).delete("/tasks/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Task deleted successfully");
      expect(deleteMock).toHaveBeenCalledTimes(1);
    });
  });
});

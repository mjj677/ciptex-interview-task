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

  it("should create a new task", async () => {
    const putMock = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    });

    (dynamoDB.put as jest.Mock).mockImplementation(putMock);

    const response = await request(app).post("/tasks").send({
      id: "1",
      title: "Test Task",
      status: "pending",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Task created successfully");
    expect(putMock).toHaveBeenCalledTimes(1);
  });

  it("should return all tasks", async () => {
    const scanMock = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        Items: [{ id: "1", title: "Test Task", status: "pending" }],
      }),
    });

    (dynamoDB.scan as jest.Mock).mockImplementation(scanMock);

    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(scanMock).toHaveBeenCalledTimes(1);
  });

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

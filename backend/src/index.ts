import express from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";
import { setupWebSocket } from "./websocket";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/tasks", taskRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

setupWebSocket(server);

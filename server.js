import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import { appConfig } from "./config/appConfig.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  setupRoutes() {
    this.app.use("/api", routes);
  }

  setupErrorHandling() {
    this.app.use((req, res, next) => {
      res.status(404).json({ message: "Route not found" });
    });

    this.app.use(errorHandler);
  }

  async connectToDatabase() {
    try {
      await mongoose.connect(appConfig.MONGODB_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
    }
  }

  start() {
    this.connectToDatabase().then(() => {
      this.app.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
      });
    });
  }
}

const server = new Server();
server.start();

export default server;

import express from "express";
import UserController from "../controllers/UserController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import RbacMiddleware from "../middleware/rbacMiddleware.js";

const router = express.Router();
const userController = new UserController();
const authMiddleware = new AuthMiddleware();
const rbacMiddleware = new RbacMiddleware();

// Apply authentication middleware to all routes
router.use(authMiddleware.authenticate);

// Routes with permission checks
router.get("/", rbacMiddleware.checkPermission("users", "read"), (req, res, next) =>
  userController.getAllUsers(req, res, next)
);
router.get("/:id", rbacMiddleware.checkPermission("users", "read"), (req, res, next) =>
  userController.getUserById(req, res, next)
);
router.post("/", rbacMiddleware.checkPermission("users", "create"), (req, res, next) =>
  userController.createUser(req, res, next)
);
router.put("/:id", rbacMiddleware.checkPermission("users", "update"), (req, res, next) =>
  userController.updateUser(req, res, next)
);
router.delete("/:id", rbacMiddleware.checkPermission("users", "delete"), (req, res, next) =>
  userController.deleteUser(req, res, next)
);

export default router;

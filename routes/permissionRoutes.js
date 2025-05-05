import express from "express";
import PermissionController from "../controllers/PermissionController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import RbacMiddleware from "../middleware/rbacMiddleware.js";

const router = express.Router();
const permissionController = new PermissionController();
const authMiddleware = new AuthMiddleware();
const rbacMiddleware = new RbacMiddleware();

// Apply authentication middleware to all routes
router.use(authMiddleware.authenticate);

// Routes with permission checks
router.get("/", rbacMiddleware.checkPermission("permissions", "read"), (req, res, next) =>
  permissionController.getAllPermissions(req, res, next)
);
router.get("/:id", rbacMiddleware.checkPermission("permissions", "read"), (req, res, next) =>
  permissionController.getPermissionById(req, res, next)
);
router.post("/", rbacMiddleware.checkPermission("permissions", "create"), (req, res, next) =>
  permissionController.createPermission(req, res, next)
);
router.put("/:id", rbacMiddleware.checkPermission("permissions", "update"), (req, res, next) =>
  permissionController.updatePermission(req, res, next)
);
router.delete("/:id", rbacMiddleware.checkPermission("permissions", "delete"), (req, res, next) =>
  permissionController.deletePermission(req, res, next)
);

export default router;

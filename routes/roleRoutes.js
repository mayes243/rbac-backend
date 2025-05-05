import express from "express";
import RoleController from "../controllers/RoleController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import RbacMiddleware from "../middleware/rbacMiddleware.js";

const router = express.Router();
const roleController = new RoleController();
const authMiddleware = new AuthMiddleware();
const rbacMiddleware = new RbacMiddleware();

// Apply authentication middleware to all routes
router.use(authMiddleware.authenticate);

// Routes with permission checks
router.get("/", rbacMiddleware.checkPermission("roles", "read"), (req, res, next) =>
  roleController.getAllRoles(req, res, next)
);
router.get("/:id", rbacMiddleware.checkPermission("roles", "read"), (req, res, next) =>
  roleController.getRoleById(req, res, next)
);
router.post("/", rbacMiddleware.checkPermission("roles", "create"), (req, res, next) =>
  roleController.createRole(req, res, next)
);
router.put("/:id", rbacMiddleware.checkPermission("roles", "update"), (req, res, next) =>
  roleController.updateRole(req, res, next)
);
router.delete("/:id", rbacMiddleware.checkPermission("roles", "delete"), (req, res, next) =>
  roleController.deleteRole(req, res, next)
);

// Role permission management
router.post(
  "/:roleId/permissions/:permissionId",
  rbacMiddleware.checkPermission("roles", "update"),
  (req, res, next) => roleController.addPermissionToRole(req, res, next)
);
router.delete(
  "/:roleId/permissions/:permissionId",
  rbacMiddleware.checkPermission("roles", "update"),
  (req, res, next) => roleController.removePermissionFromRole(req, res, next)
);

export default router;

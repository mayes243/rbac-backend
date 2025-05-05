import PermissionService from "../services/PermissionService.js";
import RbacService from "../services/RbacService.js";

class PermissionController {
  async getAllPermissions(req, res, next) {
    try {
      const permissions = await PermissionService.getAllPermissions();
      return res.status(200).json(permissions);
    } catch (error) {
      next(error);
    }
  }

  async getPermissionById(req, res, next) {
    try {
      const { id } = req.params;
      const permission = await PermissionService.getPermissionById(id);

      if (!permission) {
        return res.status(404).json({ message: "Permission not found" });
      }

      return res.status(200).json(permission);
    } catch (error) {
      next(error);
    }
  }

  async createPermission(req, res, next) {
    try {
      // Check if user is superadmin
      const isSuperAdmin = await RbacService.isSuperAdmin(req.user.id);
      if (!isSuperAdmin) {
        return res.status(403).json({ message: "Only superadmin can create permissions" });
      }

      const permissionData = req.body;
      const permission = await PermissionService.createPermission(permissionData);
      return res.status(201).json(permission);
    } catch (error) {
      next(error);
    }
  }

  async updatePermission(req, res, next) {
    try {
      // Check if user is superadmin
      const isSuperAdmin = await RbacService.isSuperAdmin(req.user.id);
      if (!isSuperAdmin) {
        return res.status(403).json({ message: "Only superadmin can update permissions" });
      }

      const { id } = req.params;
      const permissionData = req.body;
      const permission = await PermissionService.updatePermission(id, permissionData);

      if (!permission) {
        return res.status(404).json({ message: "Permission not found" });
      }

      return res.status(200).json(permission);
    } catch (error) {
      next(error);
    }
  }

  async deletePermission(req, res, next) {
    try {
      // Check if user is superadmin
      const isSuperAdmin = await RbacService.isSuperAdmin(req.user.id);
      if (!isSuperAdmin) {
        return res.status(403).json({ message: "Only superadmin can delete permissions" });
      }

      const { id } = req.params;
      const permission = await PermissionService.deletePermission(id);

      if (!permission) {
        return res.status(404).json({ message: "Permission not found" });
      }

      return res.status(200).json({ message: "Permission deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default PermissionController;

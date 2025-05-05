import RoleService from "../services/RoleService.js";
import RbacService from "../services/RbacService.js";

class RoleController {
  async getAllRoles(req, res, next) {
    try {
      const roles = await RoleService.getAllRoles();
      return res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  }

  async getRoleById(req, res, next) {
    try {
      const { id } = req.params;
      const role = await RoleService.getRoleById(id);

      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }

  async createRole(req, res, next) {
    try {
      // Check if user is superadmin
      const isSuperAdmin = await RbacService.isSuperAdmin(req.user.id);
      if (!isSuperAdmin) {
        return res.status(403).json({ message: "Only superadmin can create roles" });
      }

      const roleData = req.body;
      const role = await RoleService.createRole(roleData);
      return res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req, res, next) {
    try {
      // Check if user is superadmin
      const isSuperAdmin = await RbacService.isSuperAdmin(req.user.id);
      if (!isSuperAdmin) {
        return res.status(403).json({ message: "Only superadmin can update roles" });
      }

      const { id } = req.params;
      const roleData = req.body;
      const role = await RoleService.updateRole(id, roleData);

      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }

  async deleteRole(req, res, next) {
    try {
      // Check if user is superadmin
      const isSuperAdmin = await RbacService.isSuperAdmin(req.user.id);
      if (!isSuperAdmin) {
        return res.status(403).json({ message: "Only superadmin can delete roles" });
      }

      const { id } = req.params;
      const role = await RoleService.deleteRole(id);

      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      return res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async addPermissionToRole(req, res, next) {
    try {
      // Check if user is superadmin
      const isSuperAdmin = await RbacService.isSuperAdmin(req.user.id);
      if (!isSuperAdmin) {
        return res.status(403).json({ message: "Only superadmin can modify role permissions" });
      }

      const { roleId, permissionId } = req.params;
      const role = await RoleService.addPermissionToRole(roleId, permissionId);
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }

  async removePermissionFromRole(req, res, next) {
    try {
      // Check if user is superadmin
      const isSuperAdmin = await RbacService.isSuperAdmin(req.user.id);
      if (!isSuperAdmin) {
        return res.status(403).json({ message: "Only superadmin can modify role permissions" });
      }

      const { roleId, permissionId } = req.params;
      const role = await RoleService.removePermissionFromRole(roleId, permissionId);
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }
}

export default RoleController;

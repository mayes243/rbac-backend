import UserRepository from "../repositories/UserRepository.js";
import RoleRepository from "../repositories/RoleRepository.js";
import PermissionRepository from "../repositories/PermissionRepository.js";

class RbacService {
  async checkPermission(userId, resource, action) {
    // Get user with role
    const user = await UserRepository.findWithRole(userId);
    if (!user) {
      return false;
    }

    // Get role with permissions
    const role = await RoleRepository.findWithPermissions(user.roleId);
    if (!role) {
      return false;
    }

    // Check if role has the required permission
    for (const permissionId of role.permissions) {
      const permission = await PermissionRepository.findById(permissionId);

      if (
        permission.resource === resource &&
        (permission.action === action || permission.action === "manage")
      ) {
        return true;
      }
    }

    return false;
  }

  async isSuperAdmin(userId) {
    const user = await UserRepository.findWithRole(userId);
    if (!user) {
      return false;
    }

    const role = await RoleRepository.findById(user.roleId);
    return role && role.name === "superadmin";
  }
}

export default new RbacService();

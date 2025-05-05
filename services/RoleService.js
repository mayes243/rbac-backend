import RoleRepository from "../repositories/RoleRepository.js";
import PermissionRepository from "../repositories/PermissionRepository.js";

class RoleService {
  async getAllRoles() {
    return RoleRepository.findAllWithPermissions();
  }

  async getRoleById(id) {
    return RoleRepository.findWithPermissions(id);
  }

  async createRole(roleData) {
    const { name, description, permissions } = roleData;

    // Check if role already exists
    const existingRole = await RoleRepository.findByName(name);
    if (existingRole) {
      throw new Error("Role already exists");
    }

    // Check if all permissions exist
    if (permissions && permissions.length > 0) {
      for (const permissionId of permissions) {
        const permission = await PermissionRepository.findById(permissionId);
        if (!permission) {
          throw new Error(`Permission with id ${permissionId} not found`);
        }
      }
    }

    return RoleRepository.create(roleData);
  }

  async updateRole(id, roleData) {
    return RoleRepository.update(id, roleData);
  }

  async deleteRole(id) {
    return RoleRepository.delete(id);
  }

  async addPermissionToRole(roleId, permissionId) {
    const role = await RoleRepository.findById(roleId);
    if (!role) {
      throw new Error("Role not found");
    }

    const permission = await PermissionRepository.findById(permissionId);
    if (!permission) {
      throw new Error("Permission not found");
    }

    if (role.permissions.includes(permissionId)) {
      throw new Error("Permission already assigned to role");
    }

    role.permissions.push(permissionId);
    return role.save();
  }

  async removePermissionFromRole(roleId, permissionId) {
    const role = await RoleRepository.findById(roleId);
    if (!role) {
      throw new Error("Role not found");
    }

    const permissionIndex = role.permissions.indexOf(permissionId);
    if (permissionIndex === -1) {
      throw new Error("Permission not assigned to role");
    }

    role.permissions.splice(permissionIndex, 1);
    return role.save();
  }
}

export default new RoleService();

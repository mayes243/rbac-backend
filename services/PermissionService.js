import PermissionRepository from "../repositories/PermissionRepository.js";

class PermissionService {
  async getAllPermissions() {
    return PermissionRepository.findAll();
  }

  async getPermissionById(id) {
    return PermissionRepository.findById(id);
  }

  async createPermission(permissionData) {
    const { name, resource, action } = permissionData;

    // Check if permission already exists
    const existingPermission = await PermissionRepository.findByName(name);
    if (existingPermission) {
      throw new Error("Permission already exists");
    }

    const existingResourceAction = await PermissionRepository.findByResourceAndAction(
      resource,
      action
    );
    if (existingResourceAction) {
      throw new Error(`Permission for ${action} on ${resource} already exists`);
    }

    return PermissionRepository.create(permissionData);
  }

  async updatePermission(id, permissionData) {
    return PermissionRepository.update(id, permissionData);
  }

  async deletePermission(id) {
    return PermissionRepository.delete(id);
  }
}

export default new PermissionService();

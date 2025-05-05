import UserRepository from "../repositories/UserRepository.js";
import RoleRepository from "../repositories/RoleRepository.js";

class UserService {
  async getAllUsers() {
    return UserRepository.findAll();
  }

  async getUserById(id) {
    return UserRepository.findWithRole(id);
  }

  async createUser(userData) {
    const { username, email, password, roleId } = userData;

    // Check if user already exists
    const existingUser = await UserRepository.findByUsername(username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const existingEmail = await UserRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error("Email already exists");
    }

    // Check if role exists
    const role = await RoleRepository.findById(roleId);
    if (!role) {
      throw new Error("Role not found");
    }

    return UserRepository.create(userData);
  }

  async updateUser(id, userData) {
    return UserRepository.update(id, userData);
  }

  async deleteUser(id) {
    return UserRepository.delete(id);
  }
}

export default new UserService();

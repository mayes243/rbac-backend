import BaseRepository from "./BaseRepository.js";
import Role from "../models/Role.js";

class RoleRepository extends BaseRepository {
  constructor() {
    super(Role);
  }

  async findByName(name) {
    return this.model.findOne({ name });
  }

  async findWithPermissions(id) {
    return this.model.findById(id).populate("permissions");
  }

  async findAllWithPermissions() {
    return this.model.find().populate("permissions").sort({ createdAt: -1 });
  }
}

export default new RoleRepository();

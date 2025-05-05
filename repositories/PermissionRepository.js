import BaseRepository from "./BaseRepository.js";
import Permission from "../models/Permission.js";

class PermissionRepository extends BaseRepository {
  constructor() {
    super(Permission);
  }

  async findByName(name) {
    return this.model.findOne({ name });
  }

  async findByResourceAndAction(resource, action) {
    return this.model.findOne({ resource, action });
  }
}

export default new PermissionRepository();

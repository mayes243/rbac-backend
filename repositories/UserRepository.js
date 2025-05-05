import BaseRepository from "./BaseRepository.js";
import User from "../models/User.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByUsername(username) {
    return this.model.findOne({ username });
  }

  async findByEmail(email) {
    return this.model.findOne({ email });
  }

  async findWithRole(id) {
    return this.model.findById(id).populate("roleId");
  }
}

export default new UserRepository();

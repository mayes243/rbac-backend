import mongoose from "mongoose";

class RoleModel {
  constructor() {
    this.schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      permissions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Permission",
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    });

    this.setupHooks();
    this.model = mongoose.model("Role", this.schema);
  }

  setupHooks() {
    this.schema.pre("save", function (next) {
      this.updatedAt = Date.now();
      next();
    });
  }

  getModel() {
    return this.model;
  }
}

export default new RoleModel().getModel();

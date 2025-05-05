import mongoose from "mongoose";

class PermissionModel {
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
      resource: {
        type: String,
        required: true,
        trim: true,
      },
      action: {
        type: String,
        required: true,
        enum: ["create", "read", "update", "delete", "manage"],
        trim: true,
      },
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
    this.model = mongoose.model("Permission", this.schema);
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

export default new PermissionModel().getModel();

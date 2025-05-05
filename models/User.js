import mongoose from "mongoose";
import bcrypt from "bcryptjs";

class UserModel {
  constructor() {
    this.schema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
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
    this.model = mongoose.model("User", this.schema);
  }

  setupHooks() {
    this.schema.pre("save", async function (next) {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
      }
      this.updatedAt = Date.now();
      next();
    });

    this.schema.methods.comparePassword = async function (password) {
      return bcrypt.compare(password, this.password);
    };
  }

  getModel() {
    return this.model;
  }
}

export default new UserModel().getModel();

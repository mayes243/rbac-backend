import User from "../models/User.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { appConfig } from "../config/appConfig.js";

dotenv.config();

class SeedData {
  constructor() {
    this.permissions = [
      { name: "CREATE_USER", description: "Create users", resource: "users", action: "create" },
      { name: "READ_USER", description: "Read users", resource: "users", action: "read" },
      { name: "UPDATE_USER", description: "Update users", resource: "users", action: "update" },
      { name: "DELETE_USER", description: "Delete users", resource: "users", action: "delete" },
      { name: "CREATE_ROLE", description: "Create roles", resource: "roles", action: "create" },
      { name: "READ_ROLE", description: "Read roles", resource: "roles", action: "read" },
      { name: "UPDATE_ROLE", description: "Update roles", resource: "roles", action: "update" },
      { name: "DELETE_ROLE", description: "Delete roles", resource: "roles", action: "delete" },
      {
        name: "CREATE_PERMISSION",
        description: "Create permissions",
        resource: "permissions",
        action: "create",
      },
      {
        name: "READ_PERMISSION",
        description: "Read permissions",
        resource: "permissions",
        action: "read",
      },
      {
        name: "UPDATE_PERMISSION",
        description: "Update permissions",
        resource: "permissions",
        action: "update",
      },
      {
        name: "DELETE_PERMISSION",
        description: "Delete permissions",
        resource: "permissions",
        action: "delete",
      },
    ];
  }

  async connect() {
    try {
      await mongoose.connect(appConfig.MONGODB_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
    }
  }

  async seed() {
    try {
      await this.connect();

      // Clear existing data
      await User.deleteMany({});
      await Role.deleteMany({});
      await Permission.deleteMany({});

      // Create permissions
      const createdPermissions = await Permission.insertMany(this.permissions);
      console.log(`${createdPermissions.length} permissions created`);

      // Create roles
      const superAdminRole = await Role.create({
        name: "superadmin",
        description: "Super Administrator with all permissions",
        permissions: createdPermissions.map((p) => p._id),
      });

      const adminRole = await Role.create({
        name: "admin",
        description: "Administrator with limited permissions",
        permissions: createdPermissions
          .filter((p) => p.resource !== "permissions" && p.name !== "delete-role")
          .map((p) => p._id),
      });

      const userRole = await Role.create({
        name: "user",
        description: "Regular user with basic permissions",
        permissions: createdPermissions.filter((p) => p.action === "read").map((p) => p._id),
      });

      console.log(`${await Role.countDocuments()} roles created`);

      // Create users
      const password = "password123";

      await User.create({
        username: "superadmin",
        email: "superadmin@example.com",
        password,
        roleId: superAdminRole._id,
      });

      await User.create({
        username: "admin",
        email: "admin@example.com",
        password,
        roleId: adminRole._id,
      });

      await User.create({
        username: "user",
        email: "user@example.com",
        password,
        roleId: userRole._id,
      });

      console.log(`${await User.countDocuments()} users created`);

      console.log("Seed completed successfully");
      process.exit(0);
    } catch (error) {
      console.error("Seed error:", error);
      process.exit(1);
    }
  }
}

const seeder = new SeedData();
seeder.seed();

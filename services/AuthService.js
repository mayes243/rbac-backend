import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";
import { appConfig } from "../config/appConfig.js";

class AuthService {
  async login(username, password) {
    const user = await UserRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const userWithRole = await UserRepository.findWithRole(user._id);
    const token = this.generateToken(userWithRole);

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: userWithRole.roleId,
      },
      token,
    };
  }

  generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.roleId._id,
      },
      appConfig.JWT_SECRET,
      { expiresIn: appConfig.JWT_EXPIRES_IN }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, appConfig.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

export default new AuthService();

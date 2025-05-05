import AuthService from "../services/AuthService.js";

class AuthController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const result = await AuthService.login(username, password);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;

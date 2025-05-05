import RbacService from "../services/RbacService.js";

class RbacMiddleware {
  checkPermission(resource, action) {
    return async (req, res, next) => {
      try {
        const userId = req.user.id;

        // Check if user is superadmin (has all permissions)
        const isSuperAdmin = await RbacService.isSuperAdmin(userId);
        if (isSuperAdmin) {
          return next();
        }

        // Check specific permission
        const hasPermission = await RbacService.checkPermission(userId, resource, action);

        if (!hasPermission) {
          return res.status(403).json({
            message: `You don't have permission to ${action} ${resource}`,
          });
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

export default RbacMiddleware;

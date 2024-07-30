import { Request, Response, NextFunction } from 'express';

export const checkPermission = (requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.userRole;

    if (!userRole) {
      console.log("User role not found");
      return res.status(403).json({ message: 'User role not found' });
    }

    if (!requiredRoles.includes(userRole)) {
      console.log("Forbidden: Insufficient permissions");
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    console.log(`User ${req.userId} with role ${req.userRole} has permission`);
    next();
  };
};

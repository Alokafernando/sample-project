import { Request, Response, NextFunction } from "express"

export interface AuthRequest extends Request {
  user?: any
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" })
    }

    // if (req.user.roles !== "ADMIN") {
    //   return res.status(403).json({ message: "Access denied: Admins only" })
    // }
    if (!req.user.roles?.includes("ADMIN")) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    

    next();
  } catch (err: any) {
    res.status(500).json({ message: err?.message })
  }
}

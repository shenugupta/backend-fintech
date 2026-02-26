import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { signupSchema, loginSchema } from "./auth.validation";

const service = new AuthService();

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = signupSchema.parse(req.body);
    const result = await service.signup(
      data.email,
      data.password,
      data.fullName
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await service.login(data.email, data.password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
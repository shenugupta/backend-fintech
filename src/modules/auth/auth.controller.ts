import { Request, Response } from "express";
import * as authService from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  const result = await authService.signup(req.body);
  res.json(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  res.json(result);
};

export const refresh = async (req: Request, res: Response) => {
  const result = await authService.refreshToken(req.body.refreshToken);
  res.json(result);
};
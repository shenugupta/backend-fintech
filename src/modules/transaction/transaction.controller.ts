import { Response } from "express";
import * as transactionService from "./transaction.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const transfer = async (req: AuthRequest, res: Response) => {
  const result = await transactionService.transfer(
    req.user.userId,
    req.body.toWalletId,
    req.body.amount
  );

  res.json(result);
};
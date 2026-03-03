import { prisma } from "../../config/prisma";
import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const getWallet = async (req: AuthRequest, res: Response) => {
  const wallet = await prisma.wallet.findFirst({
    where: { userId: req.user.userId }
  });

  res.json(wallet);
};
import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { prisma } from "../../config/prisma";

export const submitKYC = async (req: AuthRequest, res: Response) => {
  const kyc = await prisma.kyc.upsert({
    where: { userId: req.user.userId },
    update: {
      document: req.body.document,
      status: "PENDING"
    },
    create: {
      userId: req.user.userId,
      document: req.body.document,
      status: "PENDING"
    }
  });

  res.json(kyc);
};
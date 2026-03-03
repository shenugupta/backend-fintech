import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (data: any) => {
  const hash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash: hash,
      fullName: data.fullName
    }
  });

  await prisma.wallet.create({
    data: {
      userId: user.id,
      balance: 0,
      currency: "INR"
    }
  });

  return { message: "User created" };
};

export const login = async (data: any) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "15m"
  });

  return { accessToken };
};

export const refreshToken = async (refreshToken: string) => {
  // implement DB refresh token validation
  return { message: "refresh logic here" };
};
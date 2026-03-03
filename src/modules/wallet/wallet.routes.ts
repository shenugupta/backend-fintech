import { Router } from "express";
import { getWallet } from "./wallet.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, getWallet);

export default router;
import { Router } from "express";
import { transfer } from "./transaction.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/transfer", authenticate, transfer);

export default router;
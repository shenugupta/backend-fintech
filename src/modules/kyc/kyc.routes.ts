import { Router } from "express";
import { submitKYC } from "./kyc.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, submitKYC);

export default router;
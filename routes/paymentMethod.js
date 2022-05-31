import express from "express";
import {
  getPaymentMethods,
  createPaymentMethod,
} from "../controllers/paymentMethod.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getPaymentMethods);
router.post("/", auth, createPaymentMethod);

export default router;

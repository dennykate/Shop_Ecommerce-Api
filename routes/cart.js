import express from "express";
import {
  createCart,
  getCartDetail,
  getCarts,
  updateStatus,
} from "../controllers/cart.js";

const router = express.Router();

router.post("/", createCart);
router.get("/user/:id", getCarts);
router.get("/detail/:id", getCartDetail);
router.patch("/update-status/:id", updateStatus);

export default router;

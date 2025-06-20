import express from "express";

import {
  createTransaction,
  getTransactionByUserId,
  deleteTransaction,
  getUserSummary,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", createTransaction);

router.get("/:user_id", getTransactionByUserId);

router.delete("/:id", deleteTransaction);

router.get("/summary/:user_id", getUserSummary);

export default router;

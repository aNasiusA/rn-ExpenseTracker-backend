import { sql } from "../config/db.js";

export const createTransaction = async (req, res) => {
  const { user_id, title, amount, category } = req.body;
  try {
    await sql`INSERT INTO transactions (user_id, title, amount, category) VALUES (${user_id}, ${title}, ${amount}, ${category})`;
    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTransactionByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id = ${user_id}`;
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error finding transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await sql`DELETE FROM transactions WHERE id = ${id}`;
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserSummary = async (req, res) => {
  try {
    const { user_id } = req.params;

    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${user_id}`;

    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${user_id} AND amount > 0`;

    const expenseResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${user_id} AND amount < 0`;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expenseResult[0].expenses,
    });
  } catch (error) {
    console.error("Error fetching transaction summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

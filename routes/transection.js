import express from "express"
import { protect } from "../middleware/auth.js"
import { createTransection, deleteTransection, getAllTransactions, getMonthlySummary, updateTransection } from "../controllers/transection.js"
import { validate } from "../middleware/validateZote.js"
import { createTransactionSchema } from "../schemas/transaction.js"
const router=express.Router()


/**
 * @swagger
 * /transections:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/transections",protect,getAllTransactions)




/**
 * @swagger
 * /transection:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Transaction created
 */

router.post("/transection",protect,validate(createTransactionSchema),createTransection)





/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Transaction ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transaction updated
 *       404:
 *         description: Transaction not found
 */
router.put("/update/:id",protect,updateTransection)



/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Transaction ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 *       404:
 *         description: Transaction not found
 */

router.delete("/delete/:id",protect,deleteTransection)



/**
 * @swagger
 * /transections/monthly-summary:
 *   get:
 *     summary: Get monthly transaction summary (grouped by category)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: month
 *         in: query
 *         description: Month (1–12)
 *         required: true
 *         schema:
 *           type: string
 *       - name: year
 *         in: query
 *         description: Year (e.g., 2025)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Monthly summary returned
 *       400:
 *         description: Invalid input
 */

router.get("/transections/monthly-summary", protect, getMonthlySummary);


export default router
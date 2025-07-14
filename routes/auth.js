
import express from "express"
import { login, register } from "../controllers/auth.js"
import { validate } from "../middleware/validateZote.js"
import { createUserSchema } from "../schemas/userSchema.js"

const router=express.Router()


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Adnan
 *               email:
 *                 type: string
 *                 example: adnan@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register",validate(createUserSchema),register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: adnan@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/login",login)







export default router
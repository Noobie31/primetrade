import { Router } from 'express';
import { register, login, getMe, registerAdmin } from '../controllers/auth.controller';
import { registerValidation, loginValidation, adminRegisterValidation } from '../middleware/validation';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *                 minLength: 2
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post('/register', registerValidation, register);

/**
 * @swagger
 * /api/v1/auth/register-admin:
 *   post:
 *     summary: Register a new admin user (requires admin secret)
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - adminSecret
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@primetrade.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: Admin123
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: Admin User
 *               adminSecret:
 *                 type: string
 *                 example: primetrade-admin-secret-2026
 *     responses:
 *       201:
 *         description: Admin user registered successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Invalid admin secret
 */
router.post('/register-admin', adminRegisterValidation, registerAdmin);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
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
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginValidation, login);

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Not authenticated
 */
router.get('/me', authenticate, getMe);

export default router;

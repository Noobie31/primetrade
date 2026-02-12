import { body, ValidationChain } from 'express-validator';

export const registerValidation: ValidationChain[] = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    body('name')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long')
        .escape()
];

// Admin registration validation
export const adminRegisterValidation: ValidationChain[] = [
    ...registerValidation,
    body('adminSecret')
        .notEmpty()
        .withMessage('Admin secret is required')
];

export const loginValidation: ValidationChain[] = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

export const taskValidation: ValidationChain[] = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters')
        .escape(),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters')
        .escape(),
    body('status')
        .optional()
        .isIn(['TODO', 'IN_PROGRESS', 'DONE'])
        .withMessage('Status must be TODO, IN_PROGRESS, or DONE'),
    body('priority')
        .optional()
        .isIn(['LOW', 'MEDIUM', 'HIGH'])
        .withMessage('Priority must be LOW, MEDIUM, or HIGH')
];

export const taskUpdateValidation: ValidationChain[] = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters')
        .escape(),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters')
        .escape(),
    body('status')
        .optional()
        .isIn(['TODO', 'IN_PROGRESS', 'DONE'])
        .withMessage('Status must be TODO, IN_PROGRESS, or DONE'),
    body(' priority')
        .optional()
        .isIn(['LOW', 'MEDIUM', 'HIGH'])
        .withMessage('Priority must be LOW, MEDIUM, or HIGH')
];

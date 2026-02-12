import { Response } from 'express';
import { validationResult } from 'express-validator';
import Task from '../models/Task.model';
import { AuthRequest } from '../middleware/auth';
import { UserRole } from '../models/User.model';
import logger from '../utils/logger';

/**
 * @desc    Create a new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        const { title, description, status, priority } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            userId: req.user!.userId
        });

        logger.info(`Task created: ${task._id} by user ${req.user!.userId}`);

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: { task }
        });
    } catch (error: any) {
        logger.error(`Create task error: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Server error while creating task'
        });
    }
};

/**
 * @desc    Get all tasks
 * @route   GET /api/v1/tasks
 * @access  Private (Users see own tasks, Admins see all)
 */
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { status, priority, page = '1', limit = '10' } = req.query;

        // Build query
        const query: any = {};

        // Regular users can only see their own tasks
        if (req.user!.role === UserRole.USER) {
            query.userId = req.user!.userId;
        }
        // Admins can see all tasks (no userId filter)

        // Add filters if provided
        if (status) {
            query.status = status;
        }
        if (priority) {
            query.priority = priority;
        }

        // Pagination
        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const skip = (pageNum - 1) * limitNum;


        const tasks = await Task.find(query)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        const total = await Task.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                tasks,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total,
                    pages: Math.ceil(total / limitNum)
                }
            }
        });
    } catch (error: any) {
        logger.error(`Get tasks error: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching tasks'
        });
    }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id).populate('userId', 'name email');

        if (!task) {
            res.status(404).json({
                success: false,
                message: 'Task not found'
            });
            return;
        }

        // Check access: user can only see own tasks, admin can see all
        if (
            req.user!.role === UserRole.USER &&
            task.userId._id.toString() !== req.user!.userId
        ) {
            res.status(403).json({
                success: false,
                message: 'Not authorized to view this task'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: { task }
        });
    } catch (error: any) {
        logger.error(`Get task error: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching task'
        });
    }
};

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private (Owner or Admin)
 */
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({
                success: false,
                message: 'Task not found'
            });
            return;
        }

        // Check access: owner or admin
        if (
            req.user!.role === UserRole.USER &&
            task.userId.toString() !== req.user!.userId
        ) {
            res.status(403).json({
                success: false,
                message: 'Not authorized to update this task'
            });
            return;
        }

        const { title, description, status, priority } = req.body;

        // Update fields
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;
        if (priority !== undefined) task.priority = priority;

        await task.save();

        logger.info(`Task updated: ${task._id} by user ${req.user!.userId}`);

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: { task }
        });
    } catch (error: any) {
        logger.error(`Update task error: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Server error while updating task'
        });
    }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private (Owner or Admin)
 */
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({
                success: false,
                message: 'Task not found'
            });
            return;
        }

        // Check access: owner or admin
        if (
            req.user!.role === UserRole.USER &&
            task.userId.toString() !== req.user!.userId
        ) {
            res.status(403).json({
                success: false,
                message: 'Not authorized to delete this task'
            });
            return;
        }

        await task.deleteOne();

        logger.info(`Task deleted: ${req.params.id} by user ${req.user!.userId}`);

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error: any) {
        logger.error(`Delete task error: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting task'
        });
    }
};

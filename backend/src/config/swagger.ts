export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PrimeTrade Backend API',
            version: '1.0.0',
            description: 'Scalable REST API with Authentication & Role-Based Access - Backend Developer Intern Assignment',
            contact: {
                name: 'API Support',
                email: 'support@primetrade.ai'
            }
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server'
            },
            {
                url: 'https://api.primetrade.ai',
                description: 'Production server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token obtained from login/register endpoint'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'User ID'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        name: {
                            type: 'string',
                            description: 'User full name'
                        },
                        role: {
                            type: 'string',
                            enum: ['USER', 'ADMIN'],
                            description: 'User role'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                Task: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Task ID'
                        },
                        title: {
                            type: 'string',
                            description: 'Task title'
                        },
                        description: {
                            type: 'string',
                            description: 'Task description'
                        },
                        status: {
                            type: 'string',
                            enum: ['TODO', 'IN_PROGRESS', 'DONE'],
                            description: 'Task status'
                        },
                        priority: {
                            type: 'string',
                            enum: ['LOW', 'MEDIUM', 'HIGH'],
                            description: 'Task priority'
                        },
                        userId: {
                            type: 'string',
                            description: 'ID of user who created the task'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Error message'
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object'
                            },
                            description: 'Validation errors (if any)'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Authentication',
                description: 'User authentication and authorization endpoints'
            },
            {
                name: 'Tasks',
                description: 'Task management endpoints (CRUD operations)'
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};

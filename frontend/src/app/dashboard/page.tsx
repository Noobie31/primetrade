'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, LogOut, Shield, Filter, User, Crown } from 'lucide-react';
import api from '@/lib/api';
import { getToken, getUser, logout } from '@/lib/auth';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    createdAt: string;
}

interface User {
    id: string;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
}

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [formLoading, setFormLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/login');
            return;
        }

        const userData = getUser();
        setUser(userData);
        fetchTasks();
    }, [router]);

    useEffect(() => {
        filterTasks();
    }, [tasks, statusFilter, priorityFilter]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterTasks = () => {
        let filtered = [...tasks];

        if (statusFilter !== 'ALL') {
            filtered = filtered.filter(task => task.status === statusFilter);
        }

        if (priorityFilter !== 'ALL') {
            filtered = filtered.filter(task => task.priority === priorityFilter);
        }

        setFilteredTasks(filtered);
    };

    const handleCreateTask = async (taskData: Omit<Task, '_id'>) => {
        setFormLoading(true);
        try {
            const response = await api.post('/tasks', taskData);
            if (response.data.success) {
                await fetchTasks();
                setShowForm(false);
            }
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task');
        } finally {
            setFormLoading(false);
        }
    };

    const handleUpdateTask = async (taskData: Omit<Task, '_id'>) => {
        if (!editingTask) return;
        setFormLoading(true);
        try {
            const response = await api.put(`/tasks/${editingTask._id}`, taskData);
            if (response.data.success) {
                await fetchTasks();
                setShowForm(false);
                setEditingTask(null);
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteTask = async (id: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            await fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task');
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    const taskStats = {
        todo: tasks.filter(t => t.status === 'TODO').length,
        inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
        done: tasks.filter(t => t.status === 'DONE').length
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-primary-500/10 rounded-full blur-3xl top-0 right-0 animate-pulse-slow"></div>
                <div className="absolute w-96 h-96 bg-primary-600/10 rounded-full blur-3xl bottom-0 left-0 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <Shield className="w-8 h-8 text-primary-400" />
                        <div>
                            <h1 className="text-3xl font-bold text-white">Task Dashboard</h1>
                            <p className="text-gray-400 text-sm">Welcome back, {user?.name}!</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="glass-effect-dark px-4 py-2 rounded-lg flex items-center gap-2">
                            {user?.role === 'ADMIN' ? (
                                <>
                                    <Crown className="w-5 h-5 text-yellow-400" />
                                    <span className="text-yellow-400 font-medium">Admin</span>
                                </>
                            ) : (
                                <>
                                    <User className="w-5 h-5 text-primary-400" />
                                    <span className="text-primary-400 font-medium">User</span>
                                </>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="glass-effect-dark p-6 rounded-xl">
                        <div className="text-gray-400 text-sm mb-2">Total Tasks</div>
                        <div className="text-3xl font-bold text-white">{tasks.length}</div>
                    </div>
                    <div className="glass-effect-dark p-6 rounded-xl border-l-4 border-gray-500">
                        <div className="text-gray-400 text-sm mb-2">To Do</div>
                        <div className="text-3xl font-bold text-gray-300">{taskStats.todo}</div>
                    </div>
                    <div className="glass-effect-dark p-6 rounded-xl border-l-4 border-yellow-500">
                        <div className="text-gray-400 text-sm mb-2">In Progress</div>
                        <div className="text-3xl font-bold text-yellow-400">{taskStats.inProgress}</div>
                    </div>
                    <div className="glass-effect-dark p-6 rounded-xl border-l-4 border-green-500">
                        <div className="text-gray-400 text-sm mb-2">Completed</div>
                        <div className="text-3xl font-bold text-green-400">{taskStats.done}</div>
                    </div>
                </div>

                {/* Actions & Filters */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 bg-dark-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="ALL">All Status</option>
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-4 py-2 bg-dark-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="ALL">All Priority</option>
                            <option value="HIGH">High</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="LOW">Low</option>
                        </select>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-primary-500/50"
                    >
                        <Plus className="w-5 h-5" />
                        New Task
                    </button>
                </div>

                {/* Tasks Grid */}
                {filteredTasks.length === 0 ? (
                    <div className="glass-effect-dark p-12 rounded-2xl text-center">
                        <p className="text-gray-400 text-lg">No tasks found. Create your first task!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={handleEdit}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Task Form Modal */}
            {showForm && (
                <TaskForm
                    task={editingTask}
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    onClose={handleCloseForm}
                    loading={formLoading}
                />
            )}
        </main>
    );
}

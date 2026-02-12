import { CheckCircle2, Circle, Clock, Trash2, Edit2, AlertCircle } from 'lucide-react';

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    createdAt: string;
}

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const getStatusIcon = () => {
        switch (task.status) {
            case 'DONE':
                return <CheckCircle2 className="w-5 h-5 text-green-400" />;
            case 'IN_PROGRESS':
                return <Clock className="w-5 h-5 text-yellow-400" />;
            default:
                return <Circle className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStatusColor = () => {
        switch (task.status) {
            case 'DONE':
                return 'bg-green-500/20 text-green-400 border-green-500/50';
            case 'IN_PROGRESS':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
        }
    };

    const getPriorityColor = () => {
        switch (task.priority) {
            case 'HIGH':
                return 'bg-red-500/20 text-red-400 border-red-500/50';
            case 'MEDIUM':
                return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
            default:
                return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
        }
    };

    const getPriorityIcon = () => {
        switch (task.priority) {
            case 'HIGH':
                return <AlertCircle className="w-4 h-4" />;
            case 'MEDIUM':
                return <AlertCircle className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    return (
        <div className="glass-effect-dark p-6 rounded-xl hover:bg-white/10 transition-all group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    {getStatusIcon()}
                    <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 hover:bg-primary-500/20 rounded-lg transition-colors"
                        title="Edit task"
                    >
                        <Edit2 className="w-4 h-4 text-primary-400" />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete task"
                    >
                        <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="text-gray-400 text-sm mb-4">{task.description}</p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
                    {task.status.replace('_', ' ')}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getPriorityColor()}`}>
                    {getPriorityIcon()}
                    {task.priority}
                </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700/50 space-y-1">
                <div className="text-xs text-gray-500">
                    Created {new Date(task.createdAt).toLocaleDateString()}
                </div>
                {(task as any).userId?.name && (
                    <div className="text-xs text-primary-400 flex items-center gap-1">
                        <span>👤</span>
                        <span className="font-medium">Created by: {(task as any).userId.name}</span>
                        {(task as any).userId.email && (
                            <span className="text-gray-500">({(task as any).userId.email})</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

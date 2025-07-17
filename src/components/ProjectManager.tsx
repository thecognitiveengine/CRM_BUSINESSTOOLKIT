import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  Filter,
  Search,
  BarChart3
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  contact_id?: string;
  project_id?: string;
  estimated_hours?: number;
  actual_hours?: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  contact?: {
    id: string;
    name: string;
    email: string;
  };
}

interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date?: string;
  end_date?: string;
  budget?: number;
  spent: number;
  progress: number;
  contact_id?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  contact?: {
    id: string;
    name: string;
    email: string;
  };
}

interface Contact {
  id: string;
  name: string;
  email: string;
}

const ProjectManager: React.FC = () => {
  // 🆕 NEW ENHANCEMENT: Authentication integration
  const { user } = useAuth();
  
  const [activeView, setActiveView] = useState<'kanban' | 'list' | 'calendar' | 'projects'>('kanban');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 🆕 NEW ENHANCEMENT: Load data from Supabase
  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [tasksData, contactsData] = await Promise.all([
        dataService.getTasks(user.id),
        dataService.getContacts(user.id)
      ]);
      
      setTasks(tasksData);
      setContacts(contactsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  // 🆕 NEW ENHANCEMENT: Task CRUD operations
  const handleCreateTask = async (taskData: Partial<Task>) => {
    if (!user) return;
    
    try {
      const newTask = await dataService.createTask({
        user_id: user.id,
        title: taskData.title!,
        description: taskData.description,
        status: taskData.status || 'todo',
        priority: taskData.priority || 'medium',
        due_date: taskData.due_date,
        contact_id: taskData.contact_id,
        project_id: taskData.project_id,
        estimated_hours: taskData.estimated_hours,
        tags: taskData.tags || []
      });
      
      setTasks(prev => [newTask, ...prev]);
      setShowTaskForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await dataService.updateTask(taskId, updates);
      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
      setEditingTask(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await dataService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  // 🆕 NEW ENHANCEMENT: Filter and search functionality
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesSearch = searchQuery === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'var(--status-completed-color-aurora)';
      case 'in-progress':
        return 'var(--status-active-color-aurora)';
      case 'todo':
        return 'var(--status-planning-color-aurora)';
      default:
        return 'var(--aurora-text-secondary)';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'var(--status-high-color-aurora)';
      case 'medium':
        return 'var(--status-medium-color-aurora)';
      case 'low':
        return 'var(--status-low-color-aurora)';
      default:
        return 'var(--aurora-text-secondary)';
    }
  };

  // 🆕 NEW ENHANCEMENT: Task Form Component
  const TaskForm: React.FC<{ task?: Task | null; onSubmit: (data: Partial<Task>) => void; onCancel: () => void }> = ({ 
    task, 
    onSubmit, 
    onCancel 
  }) => {
    const [formData, setFormData] = useState({
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'todo',
      priority: task?.priority || 'medium',
      due_date: task?.due_date ? task.due_date.split('T')[0] : '',
      contact_id: task?.contact_id || '',
      estimated_hours: task?.estimated_hours || '',
      tags: task?.tags?.join(', ') || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        estimated_hours: formData.estimated_hours ? parseInt(formData.estimated_hours.toString()) : undefined,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : undefined
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="aurora-card rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold aurora-text-primary mb-4">
            {task ? 'Edit Task' : 'Create New Task'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium aurora-text-primary mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg aurora-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium aurora-text-primary mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-lg aurora-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium aurora-text-primary mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg aurora-input"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium aurora-text-primary mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg aurora-input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium aurora-text-primary mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg aurora-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium aurora-text-primary mb-2">
                  Estimated Hours
                </label>
                <input
                  type="number"
                  value={formData.estimated_hours}
                  onChange={(e) => setFormData({ ...formData, estimated_hours: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg aurora-input"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium aurora-text-primary mb-2">
                Contact
              </label>
              <select
                value={formData.contact_id}
                onChange={(e) => setFormData({ ...formData, contact_id: e.target.value })}
                className="w-full px-3 py-2 rounded-lg aurora-input"
              >
                <option value="">Select a contact</option>
                {contacts.map(contact => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name} ({contact.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium aurora-text-primary mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 rounded-lg aurora-input"
                placeholder="urgent, client-work, development"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 aurora-button-secondary rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 aurora-button-primary rounded-lg"
              >
                {task ? 'Update' : 'Create'} Task
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // 🆕 NEW ENHANCEMENT: Kanban Board View
  const KanbanView: React.FC = () => {
    const todoTasks = filteredTasks.filter(task => task.status === 'todo');
    const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
    const completedTasks = filteredTasks.filter(task => task.status === 'completed');

    const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
      <div className="aurora-card rounded-lg p-4 mb-3 cursor-pointer hover:aurora-glow-hover transition-all duration-300">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium aurora-text-primary text-sm">{task.title}</h4>
          <div className="flex items-center space-x-1">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            />
            <button
              onClick={() => setEditingTask(task)}
              className="p-1 hover:aurora-button-secondary rounded"
            >
              <MoreHorizontal className="w-3 h-3 aurora-text-secondary" />
            </button>
          </div>
        </div>
        
        {task.description && (
          <p className="text-xs aurora-text-secondary mb-2 line-clamp-2">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            {task.due_date && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(task.due_date).toLocaleDateString()}</span>
              </div>
            )}
            {task.contact && (
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{task.contact.name}</span>
              </div>
            )}
          </div>
          {task.estimated_hours && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{task.estimated_hours}h</span>
            </div>
          )}
        </div>
        
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 rounded-full aurora-nav-item"
              >
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="text-xs aurora-text-secondary">+{task.tags.length - 2}</span>
            )}
          </div>
        )}
      </div>
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div className="aurora-card rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold aurora-text-primary flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: getStatusColor('todo') }}
              />
              To Do ({todoTasks.length})
            </h3>
          </div>
          <div className="space-y-3">
            {todoTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="aurora-card rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold aurora-text-primary flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: getStatusColor('in-progress') }}
              />
              In Progress ({inProgressTasks.length})
            </h3>
          </div>
          <div className="space-y-3">
            {inProgressTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div className="aurora-card rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold aurora-text-primary flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: getStatusColor('completed') }}
              />
              Completed ({completedTasks.length})
            </h3>
          </div>
          <div className="space-y-3">
            {completedTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 🆕 NEW ENHANCEMENT: List View
  const ListView: React.FC = () => (
    <div className="aurora-card rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="aurora-table">
              <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium aurora-text-primary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="aurora-table">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:aurora-glow-hover">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium aurora-text-primary">{task.title}</div>
                    {task.description && (
                      <div className="text-sm aurora-text-secondary truncate max-w-xs">
                        {task.description}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getStatusColor(task.status)}20`,
                      color: getStatusColor(task.status)
                    }}
                  >
                    {task.status.replace('-', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getPriorityColor(task.priority)}20`,
                      color: getPriorityColor(task.priority)
                    }}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm aurora-text-secondary">
                  {task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm aurora-text-secondary">
                  {task.contact?.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="aurora-text-secondary hover:aurora-text-primary"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="aurora-text-secondary hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="aurora-card rounded-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-current border-t-transparent rounded-full mx-auto mb-4" 
               style={{ borderColor: 'var(--aurora-glow-vibrant)' }}></div>
          <p className="aurora-text-secondary">Loading project data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="aurora-card rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--status-high-color-aurora)' }} />
          <h2 className="text-lg font-semibold aurora-text-primary mb-2">Authentication Required</h2>
          <p className="aurora-text-secondary">Please sign in to access the project manager.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold aurora-text-primary mb-2">Project Manager</h1>
        <p className="aurora-text-secondary">Organize and track your tasks and projects efficiently.</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 aurora-card rounded-lg p-4" 
             style={{ background: 'rgba(220, 20, 60, 0.1)', border: '1px solid rgba(220, 20, 60, 0.3)' }}>
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" style={{ color: 'var(--status-high-color-aurora)' }} />
            <span className="aurora-text-primary">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto aurora-text-secondary hover:aurora-text-primary"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        {/* View Tabs */}
        <div className="flex space-x-2">
          {[
            { id: 'kanban', name: 'Kanban', icon: BarChart3 },
            { id: 'list', name: 'List', icon: CheckCircle }
          ].map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeView === view.id
                    ? 'aurora-button-primary'
                    : 'aurora-button-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{view.name}</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowTaskForm(true)}
            className="flex items-center space-x-2 px-4 py-2 aurora-button-primary rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 aurora-card rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 aurora-text-secondary" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 rounded-lg aurora-input w-64"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg aurora-input"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 rounded-lg aurora-input"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {activeView === 'kanban' && <KanbanView />}
        {activeView === 'list' && <ListView />}
      </div>

      {/* Task Form Modal */}
      {(showTaskForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? 
            (data) => handleUpdateTask(editingTask.id, data) : 
            handleCreateTask
          }
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default ProjectManager;
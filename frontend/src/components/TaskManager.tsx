import {useTodo, type Todo} from "../hooks/useTodo.ts";
import { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import TasksList from "./TasksList";
import EditTaskModal from "./EditTaskModal";
import { useFormValidation } from "../hooks/useFormValidation";
import { validateTaskTitle, validateTaskDescription, validateTaskForm } from "../utils/validation";

export default function TaskManager() {
    const {
        todos,
        editingTodo,
        setEditingTodo,
        fetchTodos,
        createTask,
        editTask,
        deleteTask,
        toggleTaskStatus,
    } = useTodo();

    console.log(todos);
    const [createFormData, setCreateFormData] = useState({
        title: '',
        description: ''
    });
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: ''
    });
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const {
        getFieldError,
        validateField,
        validateForm,
        clearErrors
    } = useFormValidation();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: 'create' | 'edit'
    ) => {
        const { name, value } = e.target;
        if (type === 'create') {
            setCreateFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setEditFormData(prev => ({ ...prev, [name]: value }));
        }
        clearErrors();
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                validateField(name, value, validateTaskTitle);
                break;
            case 'description':
                validateField(name, value, validateTaskDescription);
                break;
        }
    };

    const onCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm(createFormData, validateTaskForm);
        if (!isValid) {
            return;
        }
        setIsCreating(true);
        try {
            await createTask(createFormData);
            setCreateFormData({ title: '', description: '' });
            clearErrors();
        } finally {
            setIsCreating(false);
        }
    };

    const onEditSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        const isValid = validateForm(editFormData, validateTaskForm);
        if (!isValid) {
            return;
        }
        setIsEditing(true);
        try {
            await editTask(id, editFormData);
            setEditFormData({ title: '', description: '' });
            clearErrors();
        } finally {
            setIsEditing(false);
        }
    };

    const handleEditClick = (todo: Todo) => {
        setEditFormData({
            title: todo.title,
            description: todo.description
        });
        clearErrors();
        setEditingTodo(todo);
    };

    const getInputClasses = (fieldName: string) => {
        const error = getFieldError(fieldName);
        const baseClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200";
        if (error) {
            return `${baseClasses} border-red-300 focus:ring-red-500 focus:border-red-300`;
        }
        return `${baseClasses} border-gray-300 focus:ring-blue-500 focus:border-blue-300`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br flex justify-center items-center w-full from-blue-50 to-indigo-100 py-8 px-4">
            <div className="w-5xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 
                        className="text-4xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                        onClick={fetchTodos}
                    >
                        Task Manager
                    </h1>
                    <p className="text-gray-600">Organize your tasks efficiently</p>
                </div>

                <CreateTaskForm
                    formData={createFormData}
                    onInputChange={e => handleInputChange(e, 'create')}
                    onBlur={handleBlur}
                    onSubmit={onCreateSubmit}
                    getFieldError={field => {
                      const err = getFieldError(field);
                      return err === null ? undefined : err;
                    }}
                    isCreating={isCreating}
                    getInputClasses={getInputClasses}
                />
                <TasksList
                    todos={todos}
                    onEdit={handleEditClick}
                    onDelete={deleteTask}
                    onToggleStatus={toggleTaskStatus}
                />
                <EditTaskModal
                    editingTodo={editingTodo}
                    formData={editFormData}
                    onInputChange={e => handleInputChange(e, 'edit')}
                    onBlur={handleBlur}
                    onSubmit={e => {
                      if (editingTodo && typeof editingTodo.id === 'number') {
                        onEditSubmit(e, editingTodo.id);
                      } else {
                        e.preventDefault();
                      }
                    }}
                    getFieldError={field => {
                      const err = getFieldError(field);
                      return err === null ? undefined : err;
                    }}
                    isEditing={isEditing}
                    getInputClasses={getInputClasses}
                    onClose={() => {
                        setEditingTodo(null);
                        clearErrors();
                    }}
                />
            </div>
        </div>
    );
} 
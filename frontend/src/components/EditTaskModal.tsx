import React from 'react';
import type { Todo } from '../hooks/useTodo';

type Props = {
  editingTodo: Todo | null;
  formData: { title: string; description: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getFieldError: (field: string) => string | undefined;
  isEditing: boolean;
  getInputClasses: (fieldName: string) => string;
  onClose: () => void;
};

const EditTaskModal: React.FC<Props> = ({
  editingTodo,
  formData,
  onInputChange,
  onBlur,
  onSubmit,
  getFieldError,
  isEditing,
  getInputClasses,
  onClose,
}) => {
  if (!editingTodo) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Edit Task</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              id="edit-title"
              value={formData.title}
              onChange={onInputChange}
              onBlur={onBlur}
              placeholder="Enter task title"
              className={getInputClasses('title')}
              required
            />
            {getFieldError('title') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('title')}</p>
            )}
          </div>
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="edit-description"
              value={formData.description}
              onChange={onInputChange}
              onBlur={onBlur}
              placeholder="Enter task description"
              className={getInputClasses('description')}
              required
            />
            {getFieldError('description') && (
              <p className="mt-1 text-sm text-red-600">{getFieldError('description')}</p>
            )}
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isEditing}
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditing ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal; 
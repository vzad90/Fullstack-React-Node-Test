import React from 'react';

type Props = {
  formData: { title: string; description: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getFieldError: (field: string) => string | undefined;
  isCreating: boolean;
  getInputClasses: (fieldName: string) => string;
};

const CreateTaskForm: React.FC<Props> = ({
  formData,
  onInputChange,
  onBlur,
  onSubmit,
  getFieldError,
  isCreating,
  getInputClasses,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Task</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
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
      </div>
      <button
        type="submit"
        disabled={isCreating}
        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCreating ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  </div>
);

export default CreateTaskForm; 
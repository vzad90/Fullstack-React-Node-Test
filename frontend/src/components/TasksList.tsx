import React from 'react';
import type { Todo } from '../hooks/useTodo';

type Props = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, status: 'DONE' | 'IN_PROGRESS') => void;
};

const TaskItem: React.FC<{
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, status: 'DONE' | 'IN_PROGRESS') => void;
}> = ({ todo, onEdit, onDelete, onToggleStatus }) => (
  <div
    className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
      todo.status === 'DONE' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
    }`}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <input
            type="checkbox"
            checked={todo.status === 'DONE'}
            onChange={e => onToggleStatus(todo.id, e.target.checked ? 'DONE' : 'IN_PROGRESS')}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <h2
            className={`font-semibold text-lg ${
              todo.status === 'DONE' ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {todo.title}
          </h2>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              todo.status === 'DONE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {todo.status === 'DONE' ? 'Completed' : 'In Progress'}
          </span>
        </div>
        <p className={`ml-8 ${todo.status === 'DONE' ? 'text-gray-500' : 'text-gray-600'}`}>{todo.description}</p>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onEdit(todo)}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const TasksList: React.FC<Props> = ({ todos, onEdit, onDelete, onToggleStatus }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
    {todos.length === 0 ? (
      <div className="text-center py-8">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <p className="text-gray-500">No tasks yet. Create your first task above!</p>
      </div>
    ) : (
      <div className="space-y-4">
        {todos.map(todo => (
          <TaskItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </div>
    )}
  </div>
);

export default TasksList; 
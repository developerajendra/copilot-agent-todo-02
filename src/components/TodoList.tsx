import React, { useState, useMemo } from 'react';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/todo';
import { format } from 'date-fns';
import {
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import AddTaskModal from './AddTaskModal';
import toast from 'react-hot-toast';

const TodoList: React.FC = () => {
  const { state, dispatch } = useTodo();
  const [editTask, setEditTask] = useState<Todo | undefined>();

  const filteredTodos = useMemo(() => {
    return state.todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        todo.description
          ?.toLowerCase()
          .includes(state.filters.search.toLowerCase());

      const matchesPriority =
        state.filters.priority.length === 0 ||
        state.filters.priority.includes(todo.priority);

      const matchesType =
        state.filters.type.length === 0 ||
        state.filters.type.includes(todo.type);

      const matchesStatus =
        state.filters.status.length === 0 ||
        (todo.completed && state.filters.status.includes('completed')) ||
        (!todo.completed && state.filters.status.includes('pending'));

      const matchesTags =
        state.filters.tags.length === 0 ||
        state.filters.tags.every((tag) => todo.tags.includes(tag));

      const matchesDateRange =
        !state.filters.dateRange.start ||
        !state.filters.dateRange.end ||
        (todo.dueDate &&
          todo.dueDate >= state.filters.dateRange.start &&
          todo.dueDate <= state.filters.dateRange.end);

      return (
        matchesSearch &&
        matchesPriority &&
        matchesType &&
        matchesStatus &&
        matchesTags &&
        matchesDateRange
      );
    });
  }, [state.todos, state.filters]);

  const handleToggleComplete = (todo: Todo) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: { ...todo, completed: !todo.completed },
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({
        type: 'DELETE_TODO',
        payload: id,
      });
      toast.success('Task deleted successfully');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-100';
      case 'medium':
        return 'text-yellow-500 bg-yellow-100';
      case 'low':
        return 'text-green-500 bg-green-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {filteredTodos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={`todo-transition rounded-lg border bg-card p-4 shadow-sm ${
              todo.completed ? 'border-green-200 bg-green-50/50' : ''
            }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => handleToggleComplete(todo)}
                  className={`mt-1 rounded-full p-1 transition-colors hover:bg-primary/10 ${
                    todo.completed ? 'text-green-500' : 'text-gray-400'
                  }`}>
                  {todo.completed ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2" />
                  )}
                </button>

                <div className="space-y-1">
                  <h3
                    className={`font-medium ${
                      todo.completed ? 'text-gray-500 line-through' : ''
                    }`}>
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className="text-sm text-muted-foreground">
                      {todo.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(
                        todo.priority
                      )}`}>
                      {todo.priority}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium">
                      {todo.type}
                    </span>
                    {todo.dueDate && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-500">
                        <ClockIcon className="mr-1 h-3 w-3" />
                        {format(new Date(todo.dueDate), 'MMM d, yyyy h:mm a')}
                      </span>
                    )}
                    {todo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setEditTask(todo)}
                  className="rounded p-1 hover:bg-primary/10">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="rounded p-1 hover:bg-destructive/10">
                  <TrashIcon className="h-5 w-5 text-destructive" />
                </button>
              </div>
            </div>

            {todo.subtasks.length > 0 && (
              <div className="mt-4 space-y-2 border-t pt-4">
                <h4 className="text-sm font-medium">Subtasks</h4>
                {todo.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center space-x-2 text-sm">
                    <CheckIcon
                      className={`h-4 w-4 ${
                        subtask.completed
                          ? 'text-green-500'
                          : 'text-muted-foreground'
                      }`}
                    />
                    <span
                      className={
                        subtask.completed
                          ? 'text-muted-foreground line-through'
                          : ''
                      }>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {filteredTodos.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">No tasks found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or add a new task
          </p>
        </div>
      )}

      <AddTaskModal
        isOpen={!!editTask}
        onClose={() => setEditTask(undefined)}
        editTask={editTask}
      />
    </div>
  );
};

export default TodoList;

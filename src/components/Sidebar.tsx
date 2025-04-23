import React from 'react';
import { useTodo } from '../context/TodoContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { state, dispatch } = useTodo();
  const { filters } = state;

  const handlePriorityChange = (priority: string) => {
    const updatedPriorities = filters.priority.includes(priority as any)
      ? filters.priority.filter((p) => p !== priority)
      : [...filters.priority, priority as any];

    dispatch({
      type: 'SET_FILTERS',
      payload: { ...filters, priority: updatedPriorities },
    });
  };

  const handleTypeChange = (type: string) => {
    const updatedTypes = filters.type.includes(type as any)
      ? filters.type.filter((t) => t !== type)
      : [...filters.type, type as any];

    dispatch({
      type: 'SET_FILTERS',
      payload: { ...filters, type: updatedTypes },
    });
  };

  const handleStatusChange = (status: 'completed' | 'pending') => {
    const updatedStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];

    dispatch({
      type: 'SET_FILTERS',
      payload: { ...filters, status: updatedStatus },
    });
  };

  const handleClearFilters = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        search: '',
        priority: [],
        type: [],
        status: [],
        tags: [],
        dateRange: {},
      },
    });
  };

  return (
    <aside className={`space-y-6 rounded-lg bg-card p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={handleClearFilters}
          className="todo-button-secondary p-1 text-sm">
          Clear All
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium">Search</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) =>
            dispatch({
              type: 'SET_FILTERS',
              payload: { ...filters, search: e.target.value },
            })
          }
          className="todo-input mt-1"
          placeholder="Search tasks..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Priority</label>
        <div className="mt-2 space-y-2">
          {['low', 'medium', 'high'].map((priority) => (
            <label key={priority} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.priority.includes(priority as any)}
                onChange={() => handlePriorityChange(priority)}
                className="mr-2"
              />
              <span className="capitalize">{priority}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Type</label>
        <div className="mt-2 space-y-2">
          {['work', 'personal', 'shopping', 'other'].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.type.includes(type as any)}
                onChange={() => handleTypeChange(type)}
                className="mr-2"
              />
              <span className="capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <div className="mt-2 space-y-2">
          {[
            { value: 'completed', label: 'Completed' },
            { value: 'pending', label: 'Pending' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.status.includes(value as any)}
                onChange={() => handleStatusChange(value as any)}
                className="mr-2"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Date Range</label>
        <div className="mt-2 space-y-2">
          <DatePicker
            selected={filters.dateRange.start}
            onChange={(date) =>
              dispatch({
                type: 'SET_FILTERS',
                payload: {
                  ...filters,
                  dateRange: { ...filters.dateRange, start: date || undefined },
                },
              })
            }
            className="todo-input w-full"
            placeholderText="Start date"
          />
          <DatePicker
            selected={filters.dateRange.end}
            onChange={(date) =>
              dispatch({
                type: 'SET_FILTERS',
                payload: {
                  ...filters,
                  dateRange: { ...filters.dateRange, end: date || undefined },
                },
              })
            }
            className="todo-input w-full"
            placeholderText="End date"
          />
        </div>
      </div>

      {filters.tags.length > 0 && (
        <div>
          <label className="block text-sm font-medium">Active Tags</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-sm">
                {tag}
                <button
                  onClick={() =>
                    dispatch({
                      type: 'SET_FILTERS',
                      payload: {
                        ...filters,
                        tags: filters.tags.filter((t) => t !== tag),
                      },
                    })
                  }
                  className="ml-1 rounded-full p-1 hover:bg-primary/20">
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

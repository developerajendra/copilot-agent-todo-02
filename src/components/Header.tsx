import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { MoonIcon, SunIcon, PlusIcon } from '@heroicons/react/24/outline';
import AddTaskModal from './AddTaskModal';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { state, dispatch } = useTodo();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <header className={`border-b bg-card px-4 py-3 ${className}`}>
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">My Todo App</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="todo-button-primary px-4 py-2">
            <PlusIcon className="mr-2 h-5 w-5" />
            Add Task
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className="todo-button-secondary p-2"
            aria-label="Toggle theme">
            {state.darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;

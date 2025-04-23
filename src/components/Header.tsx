import React, { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import { MoonIcon, SunIcon, PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import AddTaskModal from './AddTaskModal';
import LoginModal from './LoginModal';
import toast from 'react-hot-toast';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { state, dispatch } = useTodo();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(!state.user);

  // Show login modal when user is not set
  useEffect(() => {
    if (!state.user) {
      setIsLoginModalOpen(true);
    }
  }, [state.user]);

  const handleLogin = (username: string) => {
    dispatch({ type: 'SET_USER', payload: username });
    toast.success(`Welcome ${username}!`);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully');
    }
  };

  return (
    <header className={`border-b bg-card px-4 py-3 ${className}`}>
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Daily Todo</h1>

        <div className="flex items-center gap-4">
          {state.user && (
            <>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="todo-button-primary px-4 py-2">
                <PlusIcon className="mr-2 h-5 w-5" />
                Add Task
              </button>

              <div className="flex items-center gap-2">
                <UserCircleIcon className="h-5 w-5" />
                <span className="text-sm font-medium">{state.user}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-muted-foreground hover:text-foreground">
                  Logout
                </button>
              </div>
            </>
          )}

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

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    </header>
  );
};

export default Header;

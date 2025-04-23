import React, { useEffect } from 'react';
import { TodoProvider, useTodo } from './context/TodoContext';
import { Toaster } from 'react-hot-toast';
import TodoList from './components/TodoList';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function AppContent() {
  const { state } = useTodo();

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto flex gap-6 p-4">
        <Sidebar className="w-64 flex-shrink-0" />
        <main className="flex-1">
          <TodoList />
        </main>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

export default App;

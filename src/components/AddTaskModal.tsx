import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useTodo } from '../context/TodoContext';
import { Priority, TaskType, Todo } from '../types/todo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  editTask?: Todo;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  editTask,
}) => {
  const { dispatch } = useTodo();
  const [title, setTitle] = useState(editTask?.title || '');
  const [description, setDescription] = useState(editTask?.description || '');
  const [dueDate, setDueDate] = useState<Date | null>(
    editTask?.dueDate || null
  );
  const [priority, setPriority] = useState<Priority>(
    editTask?.priority || 'medium'
  );
  const [type, setType] = useState<TaskType>(editTask?.type || 'personal');
  const [tags, setTags] = useState<string[]>(editTask?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    const task: Todo = {
      id: editTask?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      completed: editTask?.completed || false,
      createdAt: editTask?.createdAt || new Date(),
      dueDate: dueDate || undefined,
      priority,
      type,
      tags,
      subtasks: editTask?.subtasks || [],
      attachments: editTask?.attachments || [],
    };

    dispatch({
      type: editTask ? 'UPDATE_TODO' : 'ADD_TODO',
      payload: task,
    });

    toast.success(
      editTask ? 'Task updated successfully' : 'Task added successfully'
    );
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate(null);
    setPriority('medium');
    setType('personal');
    setTags([]);
    setTagInput('');
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
          <Dialog.Title className="text-lg font-medium">
            {editTask ? 'Edit Task' : 'Add New Task'}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="todo-input mt-1"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="todo-input mt-1"
                rows={3}
                placeholder="Enter task description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  className="todo-input mt-1"
                  placeholderText="Select due date"
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="todo-input mt-1">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TaskType)}
                className="todo-input mt-1">
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Tags</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), handleAddTag())
                  }
                  className="todo-input flex-1"
                  placeholder="Add tags"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="todo-button-secondary px-4 py-2">
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 rounded-full p-1 hover:bg-primary/20">
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="todo-button-secondary px-4 py-2">
                Cancel
              </button>
              <button type="submit" className="todo-button-primary px-4 py-2">
                {editTask ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddTaskModal;

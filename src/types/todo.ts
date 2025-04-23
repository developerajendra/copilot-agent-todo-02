export type Priority = 'low' | 'medium' | 'high';
export type TaskType = 'work' | 'personal' | 'shopping' | 'other';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: Priority;
  type: TaskType;
  tags: string[];
  subtasks: SubTask[];
  attachments: Attachment[];
  recurring?: RecurringPattern;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  interval: number;
  endDate?: Date;
}

export interface FilterState {
  search: string;
  priority: Priority[];
  type: TaskType[];
  status: ('completed' | 'pending')[];
  tags: string[];
  dateRange: {
    start?: Date;
    end?: Date;
  };
}
"use client";

import { useState } from "react";
import { FrontendTask } from "@/types";
import { CheckCircle2, Circle, Trash2, Clock, Edit2, Save, X } from "lucide-react";

interface TaskItemProps {
  task: FrontendTask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
  isUpdating?: boolean;
}

export function TaskItem({ task, onToggle, onDelete, onUpdate, isUpdating = false }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, editTitle.trim(), editDescription.trim() || undefined);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-sm p-4 space-y-3">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="Task title"
          disabled={isUpdating}
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="Task description (optional)"
          rows={2}
          disabled={isUpdating}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            disabled={isUpdating}
            className="px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            onClick={handleSave}
            disabled={isUpdating || !editTitle.trim()}
            className="px-3 py-2 text-white bg-indigo-600 dark:bg-indigo-500 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 transition-colors flex items-center gap-1"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors group">
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <button
          onClick={() => onToggle(task.id)}
          className={`focus:outline-none transition-colors ${
            task.completed ? "text-green-500 dark:text-green-400" : "text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400"
          }`}
        >
          {task.completed ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <Circle className="h-6 w-6" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium truncate ${
              task.completed ? "text-gray-400 dark:text-gray-500 line-through" : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className={`text-xs truncate ${task.completed ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"}`}>
              {task.description}
            </p>
          )}
          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            <span>{new Date(task.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          title="Edit task"
        >
          <Edit2 className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          title="Delete task"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

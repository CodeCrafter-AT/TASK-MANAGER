import React, { useState } from 'react';

function TaskItem({ task, completeTask, deleteTask }) {
  // State for handling edit mode and task text
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskText, setEditingTaskText] = useState(task.text);

  // Handler for edit input change
  const handleEditChange = (e) => {
    setEditingTaskText(e.target.value);
  };

  // Function to start editing
  const startEditing = () => {
    setIsEditing(true);
  };

  // Function to save the edited task
  const saveEdit = () => {
    setIsEditing(false);
    // You would likely need a function to update the task text in the parent component or state
    // For now, just simulating it by logging to console
    console.log('Saving task:', editingTaskText);
  };

  return (
    <div className="task">
      {isEditing ? (
        <input type="text" value={editingTaskText} onChange={handleEditChange} />
      ) : (
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </span>
      )}
      <div className="task-buttons">
        {isEditing ? (
          <button onClick={saveEdit}>Save</button>
        ) : (
          <button onClick={startEditing}>Edit</button>
        )}
        <button onClick={() => completeTask(task.id)}>Complete</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;

import React, { useState } from 'react';

const TaskInput = () => {
  // State to store task text, priority, and due date
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('low'); // default priority
  const [dueDate, setDueDate] = useState(''); // default due date is empty

  // Handler for task text change
  const handleTaskTextChange = (e) => {
    setTaskText(e.target.value);
  };

  // Handler for priority change
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  // Handler for due date change
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  // Function to add the task (to be implemented)
  const addTask = () => {
    // Implement task addition logic
    console.log(`Task: ${taskText}, Priority: ${priority}, Due Date: ${dueDate}`);
  };

  return (
    <div>
      {/* Task input */}
      <input 
        type="text" 
        value={taskText} 
        onChange={handleTaskTextChange} 
        placeholder="Add a new task" 
      />

      {/* Priority dropdown */}
      <select value={priority} onChange={handlePriorityChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Date picker for due date */}
      <input 
        type="date" 
        value={dueDate} 
        onChange={handleDueDateChange} 
      />

      {/* Button to add the task */}
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;

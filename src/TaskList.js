import React, { useState } from 'react';
import TaskItem from './TaskItem';


function TaskList({ tasks, completeTask, deleteTask }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Combine search and filter logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filterStatus === 'all' || 
      (filterStatus === 'completed' && task.completed) ||
      (filterStatus === 'pending' && !task.completed);
    return matchesSearch && matchesFilter;
  });

  // Filter overdue tasks
  const overdueTasks = tasks.filter(task => new Date(task.deadline) < Date.now());

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Update filter status
  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchTerm} 
        onChange={handleSearch} 
      />

      <button onClick={() => handleFilterChange('all')}>All</button>
      <button onClick={() => handleFilterChange('completed')}>Completed</button>
      <button onClick={() => handleFilterChange('pending')}>Pending</button>

      <h2>Overdue Tasks</h2>
      <ul>
        {overdueTasks.map(task => (
          <li key={task.id} style={{ color: 'red' }}>
            {task.title} (Overdue: {new Date(task.deadline).toLocaleString()})
          </li>
        ))}
      </ul>

      <ul>
        {filteredTasks.map((task) => (
          <TaskItem 
            key={task.id}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

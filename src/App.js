import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [darkMode, setDarkMode] = useState(false);  // For dark mode toggle
  const [searchTerm, setSearchTerm] = useState('');  // Search term state
  const [filter, setFilter] = useState('all');       // Filter state

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Save dark mode preference whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    // Add or remove dark class from body
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id, text) => {
    setIsEditing(true);
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingTaskText } : task
      )
    );
    setIsEditing(false);
    setEditingTaskId(null);
  };

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter tasks based on their status (completed or pending)
  const filterTasks = (status) => {
    setFilter(status);
  };

  // Filtered and searched tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'pending') {
      return !task.completed;
    }
    return task.text.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      <h1>Task Manager</h1>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchTerm}
        onChange={handleSearch} 
      />

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => filterTasks('all')}>
          <FontAwesomeIcon icon={faFilter} /> All
        </button>
        <button onClick={() => filterTasks('completed')}>
          <FontAwesomeIcon icon={faFilter} /> Completed
        </button>
        <button onClick={() => filterTasks('pending')}>
          <FontAwesomeIcon icon={faFilter} /> Pending
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <button className="theme-toggle" onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        {darkMode ? ' Switch to Light Mode' : ' Switch to Dark Mode'}
      </button>

      <TaskForm addTask={addTask} />

      {/* Task List */}
      <TaskList 
        tasks={filteredTasks}
        completeTask={completeTask} 
        deleteTask={deleteTask}
        startEditing={startEditing}
        saveEdit={saveEdit}
        isEditing={isEditing} 
        editingTaskId={editingTaskId} 
        editingTaskText={editingTaskText} 
        setEditingTaskText={setEditingTaskText} 
      />
    </div>
  );
}

export default App;

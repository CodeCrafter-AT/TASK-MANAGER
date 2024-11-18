const TaskItem = ({ task }) => (
  <div className="task-item">
    <span className="task-text">{task.text}</span>
    <div className="task-actions">
      <button className="edit-btn"><i className="fas fa-edit"></i> Edit</button>
      {/* Other buttons like complete and delete would go here */}
    </div>
  </div>
);

export default TaskItem;

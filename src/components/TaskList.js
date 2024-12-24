import React from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.dueDate}</td>
            <td>{task.status}</td>
            <td>{task.priority}</td>
            <td>
              <button className="button secondary" onClick={() => onEdit(task)}>
                Edit
              </button>{" "}
              <button className="button danger" onClick={() => onDelete(task.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;

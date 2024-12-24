import React, { useState, useEffect } from "react";

const TaskForm = ({ show, onHide, onSubmit, taskToEdit }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    status: "Pending",
    priority: "Low",
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({
        name: "",
        description: "",
        dueDate: "",
        status: "Pending",
        priority: "Low",
      });
    }
  }, [taskToEdit]);

  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    onSubmit(task);
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{taskToEdit ? "Edit Task" : "Add Task"}</h3>
          <button className="button secondary" onClick={onHide}>
            X
          </button>
        </div>
        <div>
          <label>Task Name</label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="input"
          ></textarea>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="input"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="input"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="modal-footer">
          <button className="button secondary" onClick={onHide}>
            Cancel
          </button>
          <button className="button" onClick={handleSubmit}>
            {taskToEdit ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;

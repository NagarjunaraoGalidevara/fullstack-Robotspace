import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import { fetchTasks, addTask, updateTask, deleteTask } from "./api";

import "./style.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const loadTasks = async () => {
    const response = await fetchTasks();
    setTasks(response.data);
    setFilteredTasks(response.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddOrEdit = async (task) => {
    if (taskToEdit) {
      await updateTask(taskToEdit.id, task);
    } else {
      await addTask(task);
    }
    loadTasks();
    setTaskToEdit(null);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    if (status === "All") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  useEffect(() => {
    handleFilterChange(filterStatus);
  }, [tasks]);

  return (
    <div className="container">
      <h1>Task Tracker</h1>
      <TaskFilter selectedStatus={filterStatus} onFilterChange={handleFilterChange} />
      <button className="button" onClick={() => setShowForm(true)}>
        Add Task
      </button>
      <TaskList tasks={filteredTasks} onEdit={setTaskToEdit} onDelete={handleDelete} />
      <TaskForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleAddOrEdit}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default App;

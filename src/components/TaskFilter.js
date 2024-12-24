import React from "react";

const TaskFilter = ({ selectedStatus, onFilterChange }) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <label htmlFor="status-filter" style={{ marginRight: "10px" }}>
        Filter by Status:
      </label>
      <select
        id="status-filter"
        value={selectedStatus}
        onChange={(event) => onFilterChange(event.target.value)}
        style={{
          padding: "8px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;

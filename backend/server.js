const express = require("express")
const { open } = require("sqlite")
const sqlite3 = require("sqlite3")

const path = require("path")
const dbPath = path.join(__dirname, "taskmanager.db")
const cors = require('cors');

let db;

const app = express();
app.use(express.json())
app.use(cors());

const initilizeDbAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3000, () => {
            console.log("server running in 3000 port.")
        })
    } catch (e) {
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

initilizeDbAndServer();

// GET /tasks - retrive all tasks
app.get("/tasks", async (req, res) => {
    try {
      const allTasks = `SELECT * FROM tasks ORDER BY dueDate;`;
      const getTasks = await db.all(allTasks);
      res.send(getTasks)
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching tasks.");
    }
  });

  // POST /tasks - Add a new task
  app.post("/tasks", async (req, res) => {
    try {
        const { name, description, dueDate, status, priority } = req.body;
        const addingTask = `INSERT INTO tasks (name, description, dueDate, status, priority) 
        VALUES (
        '${name}',
        '${description}',
        '${dueDate}',
        '${status}',
        '${priority}'
        );`;

        const taskAdd = await db.run(addingTask);
        const getId = taskAdd.lastID;
        res.send({ Id: getId });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding task.");
    }
});
  
  // PATCH /tasks/:id - Update a task
  app.patch("/tasks/:id", async (req, res) => {
   try{
    const { id } = req.params;
    const { name, description, dueDate, status, priority } = req.body;
    const updateTask = `UPDATE tasks SET
    description = '${description}',
    priority = '${priority}',
    status = '${status}',
    name = '${name}',
    dueDate = '${dueDate}'
    WHERE id = ${id};`;
    await db.run(updateTask)
    res.send("Task updated successfully.")

   } catch (error) {
    console.error(error);
    res.status(500).send("Error updating task.");
  }
})
  
  // DELETE /tasks/:id - Delete a task
  app.delete("/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = `DELETE FROM tasks WHERE id = ${id};`;
      await db.run(task);
      res.send("Task deleted successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting task.");
    }
  });

  // BONUS: Search Functionality
app.get("/tasks/search", async (req, res) => {
    try {
      const { query } = req.query;
      const searchQuery = `
        SELECT * FROM tasks
        WHERE name LIKE ? OR description LIKE ?
        ORDER BY dueDate;
      `;
      const [tasks] = await db.all(searchQuery, [`%${query}%`, `%${query}%`]);
      res.status(200).send(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error searching tasks.");
    }
  });
  
  // BONUS: Overdue Tasks Highlight
  app.get("/tasks/overdue", async (req, res) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const query = `
        SELECT * FROM tasks
        WHERE dueDate < ? AND status != 'Completed'
        ORDER BY dueDate;
      `;
      const [tasks] = await db.all(query, [today]);
      res.status(200).send(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching overdue tasks.");
    }
  });
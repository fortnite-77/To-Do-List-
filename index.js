const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;



// Middleware to parse JSON requests
app.use(bodyParser.json());

// In-memory database for storing tasks
let tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true },
];

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// Get a single task by ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(200).json(task);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: completed || false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update an existing task by ID
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const { title, completed } = req.body;
  if (title) task.title = title;
  if (typeof completed === 'boolean') task.completed = completed;

  res.status(200).json(task);
});

// Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

// Mark a task as completed
app.patch('/api/tasks/:id/complete', (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.completed = true;
  res.status(200).json(task);
});

// Start the server
app.listen(port, () => {
  console.log(`To-Do List API is running on http://localhost:${port}`);
});

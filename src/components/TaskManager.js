import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");

  const API_URL = "https://taskmanager-6ud9.onrender.com/api/tasks";

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask, completed: false }),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    setNewTask("");
  };

  const handleToggleComplete = async (id, currentStatus, title) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: !currentStatus }),
    });
    const updated = await res.json();
    setTasks(tasks.map((task) => (task._id === id ? updated : task)));
  };

  const handleDeleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className={styles.taskManager}>
      <h3>Mini Task Manager</h3>

      <form onSubmit={handleAddTask} className={styles.taskForm}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Write a new task"
        />
        <button type="submit">Add</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li key={task._id} className={styles.taskItem}>
              <span
                className={`${styles.taskTitle} ${
                  task.completed ? styles.completed : ""
                }`}
                onClick={() =>
                  handleToggleComplete(task._id, task.completed, task.title)
                }
              >
                {task.title}
              </span>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className={styles.deleteBtn}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

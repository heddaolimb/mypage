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
    <div
      className={styles.taskManager}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "relative",
        zIndex: 20,
        padding: "10px",
        fontFamily: "inherit",
      }}
    >
      <h4
        style={{
          marginBottom: "18px",
          fontSize: "20px",
        }}
      >
        Mini Task Manager
      </h4>

      <form
        onSubmit={handleAddTask}
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Write a new task"
          style={{
            padding: "11px 14px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "inherit",
            outline: "none",
            fontSize: "14px",
            minWidth: "180px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "11px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            background: "rgba(255,255,255,0.12)",
            color: "inherit",
            transition: "all 0.2s ease",
          }}
        >
          Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul
          className={styles.taskList}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: 0,
            margin: 0,
            listStyle: "none",
          }}
        >
          {tasks.map((task) => (
            <li
              key={task._id}
              className={styles.taskItem}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <span
                className={`${styles.taskTitle} ${
                  task.completed ? styles.completed : ""
                }`}
                onClick={() =>
                  handleToggleComplete(task._id, task.completed, task.title)
                }
                style={{
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                {task.title}
              </span>

              <button
                onClick={() => handleDeleteTask(task._id)}
                className={styles.deleteBtn}
                style={{
                  padding: "7px 10px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.12)",
                  color: "inherit",
                  fontWeight: "600",
                }}
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

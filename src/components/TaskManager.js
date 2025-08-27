import { useEffect, useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hent tasks fra API ved load
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
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

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h3>Task Manager</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.title} ✅ {task.completed ? "Done" : "Not done"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

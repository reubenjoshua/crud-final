import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { toast } from "react-toastify"
//test branch update
const ReadTasks = ({ refresh }) => {
  const [tasks, setTasks] = useState([])
  const [search, setSearch] = useState("")
  const [expandedTask, setExpandedTask] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [newTitle, setNewTitle] = useState("")
  const [includeDeleted, setIncludeDeleted] = useState(false)
  const [josh, setJosh] = useState("");

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks?search=${search}&include_deleted=${includeDeleted}`)
      setTasks(response.data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      toast.error("Failed to fetch tasks")
    }
  }, [search, includeDeleted])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks, refresh])

  const handleDelete = async (taskId) => {
    if (!taskId) {
      console.error("Error: taskId is undefined")
      toast.error("Error: Unable to delete task")
      return
    }

    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`)
      fetchTasks() // Refetch tasks to update the list
      toast.success("Task Deleted Successfully!")
    } catch (error) {
      console.error("Error deleting task:", error.response || error)
      toast.error("Failed to delete task.")
    }
  }

  const toggleExpand = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
  }

  const startEditing = (task) => {
    setEditingTask(task.id)
    setNewTitle(task.title)
  }

  const handleEdit = async (taskId) => {
    if (!newTitle.trim()) return

    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, { title: newTitle })
      fetchTasks() // Refetch tasks to update the list
      setEditingTask(null)
      toast.success("Task Updated Successfully!")
    } catch (error) {
      console.error("Error updating task:", error)
      toast.error("Failed to update task")
    }
  }

  return (
    <div className="task-container">
      <div className="search-bar">
        <input type="text" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <label>
          <input type="checkbox" checked={includeDeleted} onChange={(e) => setIncludeDeleted(e.target.checked)} />
          Include deleted tasks
        </label>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.deleted_at ? "deleted" : ""}`}>
            <div onClick={() => toggleExpand(task.id)} className="task-title">
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="edit-input"
                />
              ) : (
                <strong>{task.title}</strong>
              )}
            </div>

            {expandedTask === task.id && (
              <div className="task-details">
                <small>Created: {task.created_at}</small>
                {task.updated_at && <small> | Updated: {task.updated_at}</small>}
                {task.deleted_at && <small> | Deleted: {task.deleted_at}</small>}
              </div>
            )}

            <div className="task-actions">
              {!task.deleted_at && (
                <>
                  {editingTask === task.id ? (
                    <button className="save-btn" onClick={() => handleEdit(task.id)}>
                      💾 Save
                    </button>
                  ) : (
                    <button className="edit-btn" onClick={() => startEditing(task)}>
                      ✏️ Edit
                    </button>
                  )}
                  <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                    🗑️ Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReadTasks


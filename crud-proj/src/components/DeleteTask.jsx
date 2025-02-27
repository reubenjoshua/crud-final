import axios from "axios";

const DeleteTask = ({ taskId, refreshTasks }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${taskId}`);
            refreshTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return <button className="delete-btn" onClick={handleDelete}>Delete</button>
}

export default DeleteTask
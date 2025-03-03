import axios from "axios";
import { toast } from "react-toastify";

const DeleteTask = ({ taskId, refreshTasks}) => { //id ng task ay madedelete tas si refreshTasks mag uupdate si UI after magdelete ng task
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${taskId}`);
            refreshTasks(); //nag refetch and inuupdate ang list of tasks after delete
            toast.success("Task Deleted Successfully!");

            
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task.");
        }
    };

    return <button className="delete-btn" onClick={handleDelete}>Delete</button>
}

export default DeleteTask
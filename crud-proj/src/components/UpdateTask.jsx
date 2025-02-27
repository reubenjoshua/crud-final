import { useState } from "react";
import axios from "axios";

const UpdateTask = ({ task, updateTaskInUI }) => {
    const [newTitle, setNewTitle] = useState(task.title);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/tasks/${task.id}`, { title: newTitle });

            //  Update task immediately in UI
            updateTaskInUI(task.id, response.data);

        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="adjust">
            <input 
                type="text" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <button className="update-btn" onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default UpdateTask;
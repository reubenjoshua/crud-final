import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateTask = ({ task, updateTaskInUI}) => {
    const [newTitle, setNewTitle] = useState(task.title); //si newTitle ang nagsstore ng updated task title, si useState(task.title) siya ang nagiinitialize ng newTitle with the existing task title
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/tasks/${task.id}`, { title: newTitle });

            //  Update task immediately in UI
            updateTaskInUI(task.id, response.data); //si updateTaskinUI kaya tinaatwag para si task.id ay ma identify si updated task then si response.data yung updated task nirreturn by the server tas ineensure nito na naguupdate ang title even di na ireload
            toast.success("Task Updated Successfully");

            
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("failed to update task");
        }
    };

    return (
        <div className="adjust">
            <input 
                type="text" 
                value={newTitle} //pinapakita ang latest title
                onChange={(e) => setNewTitle(e.target.value)} //inuupdate ang newTitle pag ininput ni user
            />
            <button className="update-btn" onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default UpdateTask;
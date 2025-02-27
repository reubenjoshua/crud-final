import { useState } from "react";
import axios from "axios";

const CreateTask = ({ refreshTasks }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/tasks", { title });
            setTitle("");
            refreshTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Task"/>
            <button type="submit">Add Task</button>
        </form>
    );
}

export default CreateTask;
import { useEffect, useState } from "react";
import axios from "axios";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";

const ReadTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks: ", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [])

    return (
        <div className="task-container">
            <h2>Tasks</h2>
            {tasks.map((task) => (
                <div key={task.id} className="task-card">
                    <p><strong>Title: </strong>{task.title}</p>
                    <p><strong>Created At: </strong>{task.created_at}</p>
                    <p><strong>Updated At: </strong>{task.updated_at || "Not Updated Yet"}</p>
                    <div className="task-actions">
                    <UpdateTask task={task} updateTaskInUI={fetchTasks}/>
                    <DeleteTask taskId={task.id} refreshTasks={fetchTasks}/>
                    </div>
                    
                </div>
            ))}
        </div>
    );
}

export default ReadTasks;
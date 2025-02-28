import { useEffect, useState } from "react";
import axios from "axios"; //library para sa http requests
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";

const ReadTasks = () => {
    const [tasks, setTasks] = useState([]); //naghhold nag array of tasks, si setTasks function siya ma update si tasks state and initialize ko na naka empty array

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks");
            setTasks(response.data);//si response.data is containing the lsits of tasks, tas si setTasks(response.data) inuupdate niya state ni tasks
        } catch (error) {
            console.error("Error fetching tasks: ", error);
        }
    };


    return (
        <div className="task-container">
            <h2>Tasks</h2>
            {tasks.map((task) => ( //nag map para mapadali maidentify ni react ang mga info such as task.id, task.title, task.updated_at
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

//nirreceive niya ang task object si UpdateTask, tas si updateTaskInUI={fetchtasks} ineensure ang task lists na nag uupadte afterediting
//si deletetask sa narrecive niya taskId then refreshTasks={fetchTasks} ineensure niya nag uupdate si Ui after deleting
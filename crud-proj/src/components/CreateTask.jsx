import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateTask = ({ refreshTasks }) => {  //Function component for CreateTask, nirreceive si refreshTasks
    const [title, setTitle] = useState(""); //setTitle ang naguupdate sa title

    const handleSubmit = async (e) => { //para sa from submission
        e.preventDefault(); //para di magrefresh
        try {
            await axios.post("http://localhost:5000/tasks", { title }); //http post request para kay title as a request body
            setTitle(""); //cinclear ang input field, everytime na naglalagay ng title for example ay "Add this" magssubmit ng form then api request is sent tas after successful req mag eexecute to tas magiging empty string na
            refreshTasks(); //every time na mag aadd ng task nagrrefresh tasks 
            toast.success("Task Created Successfully!");
        } catch (error) {
            console.error("Error adding task:", error); //kung mag eerror makikita sa console
            toast.error("Failed to create Task");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} 
            onChange={(e) => setTitle(e.target.value)} //inuupdate ang title pag ang user ay nagiinput
             placeholder="Enter Task"/>
            <button type="submit">Add Task</button>
        </form>
    );
}

export default CreateTask;
import { useState } from "react";
import CreateTask from "./components/CreateTask";
import ReadTasks from "./components/ReadTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";




function App() {
  const [refresh, setRefresh] = useState(false); // kaya false kase false-true or true-false magfforece na mag rerender si readTasks components
  

  const refreshTasks = () => setRefresh((prev) => !prev); //function para ma toggle si refresh state ineensue na kapag may nagagawa na task mag re-render si ReadTasks, kaya may function sa loob ni setRrefresh para ang si (prev) => !prev ineensure na ang latest state is used 

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <CreateTask refreshTasks={refreshTasks} />
      <ReadTasks key={refresh} />
      <ToastContainer position="top-right" autoClose={3000}/>
    </div>
  );
}

export default App;
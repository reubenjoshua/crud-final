import { useState, useEffect } from "react";
import CreateTask from "./components/CreateTask";
import ReadTasks from "./components/ReadTask";
import "./index.css";




function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshTasks = () => setRefresh((prev) => !prev);

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <CreateTask refreshTasks={refreshTasks} />
      <ReadTasks key={refresh} />
    </div>
  );
}

export default App;
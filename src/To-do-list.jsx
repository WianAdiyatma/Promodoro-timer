import { useState } from "react"

export default function ToDoList() {

    const [tasks, setTasks] = useState(['Learn react', 'Go to gym', 'Bulking'])
    const[newTask, setNewTask] = useState()

    function handleInputChange(e) {
        setNewTask(e.target.value)
    }

    //tambah task baru
    function addTask() {
        if(newTask.trim() !== "") {
            setTasks([...tasks, newTask])
            setNewTask('')
        }
        
    }

    //memfilter index / item yang mau dihapus
    function deleteTask(index) {
        const updatedTask = tasks.filter((_, i) => i !== index)
        setTasks(updatedTask)
    }

    return(
        <div className="to-do-list">
            <div>
            <h1>To Do List</h1>
            <div className="input-wrapper">
            <input type="text" value={newTask} onChange={handleInputChange} placeholder="Enter new task..." />
            <button className="add-btn" onClick={addTask}>Add</button>
            </div>
            </div>
            <ol>
                {tasks.map((task, index) => 
                <li key={index}>
                    <span className="text">{task}</span>
                    <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
                    </li> 
                )}
            </ol>
        </div>
    )
}
 const Task = ({ task }) => {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>
            <p>{task.desc}</p>
            <p>Status: {task.status ? "Completed" : "In proccess"}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
};
 export default Task
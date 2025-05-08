import { useState } from "react"
 const Task = ({ task, onUpdate, accessToken }) => {
     const [isEditing, setIsEditing] = useState(false)
     const [formData, setFormData] = useState({ ...task })
     const handleChange = (e) => {
         const { name, value } = e.target
         setFormData(prev => ({
             ...prev,
             [name]: name === "status" ? value === "true" : value
         }))
     }
     const handleSave = async () => {
         const response = await fetch("http://localhost:4000/api/v1.0/task/update", {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${accessToken}`,
             },
             body: JSON.stringify(formData),
         })

         if (response.ok) {
             const updated = await response.json()
             onUpdate(updated.task)
             setIsEditing(false)
         } else {
             alert("Update failed.")
         }
     }
     const handleDelete = async (id) => {
         const response = await fetch("http://localhost:4000/api/v1.0/task/delete", {
             method: "DELETE",
             headers: {
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${accessToken}`,
             },
             body: JSON.stringify( {id:id}),
         })

         if (response.ok) {
             alert('delete')
         } else {
             alert("Delete failed.")
         }
     }
    return (
        <div className="task-card">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                    />
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="true"
                                checked={formData.status === true}
                                onChange={handleChange}
                            />
                            Completed
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="false"
                                checked={formData.status === false}
                                onChange={handleChange}
                            />
                            In process
                        </label>
                    </div>

                    <button onClick={handleSave}>OK</button>
                </>
            ) : (
                <>
                    <h3>{task.title}</h3>
                    <p>{task.desc}</p>
                    <p>Status: {task.status==='COMPLETED' ? "Completed" : "In process"}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
    );
};
 export default Task
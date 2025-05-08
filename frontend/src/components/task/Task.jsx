import { useState } from "react"
 const Task = ({ task, onUpdate, accessToken, refresh }) => {
     const [isEditing, setIsEditing] = useState(false)
     const [formData, setFormData] = useState({ ...task })

     const handleChange = (e) => {
         const { name, value } = e.target

         setFormData(prev => ({
             ...prev,
             [name]: name === "status"
                 ? value === "true" ? 'COMPLETED' : 'IN_PROCESS'
                 : value

         }))
         console.log(formData)
     }
     const handleSave = async () => {
         try {
             const response = await fetch(`http://localhost:4000/api/v1.0/task/update`, {
                 method: "PUT",
                 body: JSON.stringify({
                     id: formData.id,
                     title: formData.title,
                     desc: formData.desc,
                     status: formData.status,
                 }),
                 headers: {
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                 },
             });

             if (!response.ok) {
                 const error = await response.json();
                 console.error("Server error:", error);
                 return;
             }

             const updated = await response.json();
             console.log("UPDATED RESPONSE:", updated);

             onUpdate(updated);
             setIsEditing(false);
             refresh()
         } catch (err) {
             console.error( err)
         }
     };

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
             alert('delete failed')
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
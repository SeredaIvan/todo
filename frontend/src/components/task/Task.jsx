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
                    <li>
                        <div className="px-4 py-5 sm:px-6">
                            <div className="flex items-center justify-between">
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <input
                                    type="text"
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleChange}
                                />
                                <a href="#" onClick={() => setIsEditing(true)} className="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            checked={formData.status}
                                            onChange={handleChange}
                                        />
                                        Completed
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            checked={formData.status}
                                            onChange={handleChange}
                                        />
                                        In process
                                    </label>
                                </div>
                                <a href="#" onClick={() => handleSave(task.id)} className="font-medium text-green-500 hover:text-green-800">OK</a>
                            </div>
                        </div>
                    </li>

                </>
            ) : (
                <>
                    <li>
                        <div className="px-4 py-5 sm:px-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{task.title}</h3>

                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <div><p className="mt-1 max-w-2xl text-sm text-gray-500">{task.desc}</p></div>
                                <a href="#" onClick={() => setIsEditing(true)} className="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">Status: <span className="text-green-600">{task.status==='COMPLETED' ? "Completed" : "In process"}</span></p>
                                <a href="#" onClick={() => handleDelete(task.id)} className="font-medium text-red-100 hover:text-red-800">Delete</a>
                            </div>
                        </div>
                    </li>

                </>
            )}

        </div>

    );
};
 export default Task
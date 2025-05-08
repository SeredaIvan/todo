import { useState } from "react";

const CreateTask = ({ accessToken, onCreated }) => {
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        status: "IN_PROCESS"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/api/v1.0/task/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Create failed:", error);
                return;
            }

            const createdTask = await response.json();
            console.log("Task created:", createdTask);
            onCreated(createdTask);

            // Clear form
            setFormData({ title: "", desc: "", status: "IN_PROCESS" });
        } catch (err) {
            console.error("Request error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md p-4 shadow rounded bg-white">
            <h2 className="text-lg font-bold mb-2">Create Task</h2>
            <div className="mb-2">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <input
                    type="text"
                    name="desc"
                    placeholder="Description"
                    value={formData.desc}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-gray-700 text-white py-1 px-4 rounded hover:bg-blue-700"
            >
                Create
            </button>
        </form>
    );
};

export default CreateTask;

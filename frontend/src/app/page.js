"use client"
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import Task from "@/components/task/Task";


export default function Home() {
    const [tasks, setTasks] = useState([])
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const router = useRouter()

    useEffect(() => {
        const fetchTasks = async () => {
            if (!accessToken) {
                router.push("/login")
                return
            }

            const response = await fetch("http://localhost:4000/api/v1.0/task/get-all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setTasks(data.tasks)
            } else {
                router.push("/login")
            }
        }

        fetchTasks()
    }, [accessToken, router])

    const handleUpdate = (updatedTask) => {
        setTasks(prev =>
            prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
        )
    }

    return (
        <div>
            <h1>Task List</h1>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <Task key={task.id} task={task} onUpdate={handleUpdate} accessToken={accessToken} />
                ))
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    )
}

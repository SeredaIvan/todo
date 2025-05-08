"use client"
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import Task from "@/components/task/Task";


export default function Home() {
    const router = useRouter()

    const [tasks, setTasks] = useState([])
    const [aviable, setAviable] = useState('')
    const [sortAsc, setSortAsc] = useState(true)
    const [loading,setLoading]=useState(true)

    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null



    useEffect(() => {
        const fetchTasks = async () => {

            if (!accessToken) {
                alert('Вам потрібно увійти чи зареєструватись')
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
                setLoading(false)
                if(data.tasks.length=== 0){
                    setAviable('No tasks')
                }
            }
            else {
                setAviable('No tasks')
            }
        }

        fetchTasks()
    }, [accessToken, router])

    const handleUpdate = (updatedTask) => {
        setTasks(prev =>
            prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
        )
    }

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.status === b.status) return 0;
        if (sortAsc) {
            return a.status === 'IN_PROCESS' ? -1 : 1;
        } else {
            return a.status === 'COMPLETED' ? -1 : 1;
        }
    });
    return (
        <div>
            <h1>Task List</h1>
            <button onClick={() => setSortAsc(prev => !prev)}>
                Sort: {sortAsc ? "IN_PROCESS → COMPLETED" : "COMPLETED → IN_PROCESS"}
            </button>
            {loading?
                (<p>Loading...</p>)
                :
                (sortedTasks.map(task => (
                    <Task key={task.id} task={task} onUpdate={handleUpdate} accessToken={accessToken} />
                ))
            )
            }
            <p>{aviable}</p>
        </div>
    )
}

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

    const handleRefresh=()=>{
        router.push("/")
    }

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
            <div className="bg-gray-100 py-2 px-4">
                <h2 className="text-xl font-semibold text-gray-800">Tasklist</h2>
            </div>

            <button onClick={() => setSortAsc(prev => !prev)} className={"py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"}>
                Sort: {sortAsc ? "IN_PROCESS → COMPLETED" : "COMPLETED → IN_PROCESS"}
            </button>
            {loading?
                (<p>Loading...</p>)
                :
                (sortedTasks.map(task => (
                    <ul key={task.id} className="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-2">
                        <Task
                            task={task}
                            onUpdate={handleUpdate}
                            accessToken={accessToken}
                            refresh={handleRefresh}
                        />
                    </ul>
                )))

            }
            <p>{aviable}</p>
        </div>
    )
}

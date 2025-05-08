"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!name || !password) {
            return;
        }

        const response = await fetch("http://localhost:4000/api/v1.0/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                password: password,
            }),
        });

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('accessToken', data.accessToken)
            router.push('/')
        } else {
            console.log('Something went wrong')
        }
    };

    return (
        <div >

            <form onSubmit={handleLogin} className="max-w-md p-4 shadow rounded bg-white">
                <h2 className="mb-4">Login</h2>
                <div>
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-2 border rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required

                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        className="w-full p-2 border rounded"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="bg-gray-700 text-white py-1 px-4 rounded hover:bg-blue-700 mt-4" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

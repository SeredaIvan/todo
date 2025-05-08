"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const Registration = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!name || !password) {
            return;
        }

        const response = await fetch("http://localhost:4000/api/v1.0/auth/register", {
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
            <h2>Registration</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        id="name"
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registration</button>
            </form>
        </div>
    );
};

export default Registration;

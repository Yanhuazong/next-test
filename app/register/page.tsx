'use client'
import { useState } from 'react'
import { signIn } from "next-auth/react"

export default function RegisterPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
         
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            
            const data = await res.json();
            
            console.log(data)
            //res.ok is a standard property of the Fetch API response object.
            if (!res.ok) throw new Error(data.message);

            signIn(); // Redirects to the default login page provided by next-auth
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        if (name === 'name') setName(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    }
   
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
            <input name="name" placeholder="Name" value={name} onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded" />
            <input name="email" placeholder="Email" type="email" value={email} onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded" />
            <input name="password" placeholder="Password" type="password" value={password} onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded" />
            {error&&<p>{error}</p>}
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
        </form>
    )
}


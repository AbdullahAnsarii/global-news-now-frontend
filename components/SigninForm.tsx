"use client"

import { BASE_URL_SERVER } from "@/common";
import { useState } from "react";

export default function SigninForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignin = async (e: any) => {
        e.preventDefault()
        const result = await (await fetch(BASE_URL_SERVER
            + "auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ email: email, password: password })
        })).json();
        if (result?.access_token) {
            window.localStorage.setItem("access_token", result.access_token);
            window.location.reload()
        }
        else {
            setMessage(result?.message);
        }
        setTimeout(() => {
            setMessage("");
        }, 3000)
    }
    return (
        <section>
            <h1 className="mb-3">Super Admin Signin</h1>
            <p className="text-zinc-900 text-xs mb-2">{message}</p>
            <form onSubmit={handleSignin}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-900">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded p-2" placeholder="name@something.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-zinc-900">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded p-2" required />
                </div>
                <button type="submit" className="text-white bg-zinc-800 p-2 rounded text-sm">Submit</button>
            </form>
        </section>
    )
}
"use client"

import { BASE_URL_SERVER } from "@/common";
import { useState } from "react"

export function Subscribe() {
    const [email, setEmail] = useState("");

    const handleSubscribe = async (e:any) => {
        e.preventDefault()
        const result = await (await fetch(BASE_URL_SERVER
            + "subscriber", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ email: email })
        })).json();
        console.log(result)
    }

    return (
        <div className='flex flex-col gap-4'>
            <p className='font-bold text-zinc-200'>Subscribe</p>
            <form onSubmit={handleSubscribe}>
                <div className="flex items-center gap-2 flex-grow">
                    <input onChange={(e) => setEmail(e.target.value)} type="search" id="default-search" className="min-w-[400px] focus:outline-none block p-3 text-sm text-zinc-200 bg-zinc-900 border border-zinc-200 rounded-sm" placeholder="Email address" required />
                    <button type="submit" className="bg-zinc-200 hover:bg-zinc-50 text-sm rounded-sm p-3">Submit</button>
                </div>
            </form>
        </div>
    )
}
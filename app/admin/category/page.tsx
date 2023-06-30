"use client"

import { BASE_URL_SERVER } from "@/common";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/helpers/slugify";

export default function Category() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleCreateCategory = async (e: any) => {
        e.preventDefault()
        const result = await (await fetch(BASE_URL_SERVER
            + "category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("access_token"),
            },
            mode: "cors",
            body: JSON.stringify({ title: title, slug: slug })
        })).json();
        if (result?.id) {
            setMessage(result?.title + " category created successfully");
        }
        else if (result?.statusCode == 401) {
            window.localStorage.removeItem("access_token");
            router.push("/admin");
        }
        else {
            setMessage(result?.message);
        }
        setTimeout(() => {
            setMessage("");
        }, 3000)
    }

    return (
        <section className="my-8 max-w-7xl mx-auto text-zinc-800 ">
            <p className="text-zinc-900 text-xs mb-2">{message}</p>
            <form onSubmit={handleCreateCategory}>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-zinc-900">Title</label>
                    <input value={title} onChange={(e) => {
                        setTitle(e.target.value)
                        setSlug(slugify(e.target.value))
                    }}
                        id="title" className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded p-2" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-zinc-900">slug</label>
                    <input value={slug}
                        disabled
                        id="slug" className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded p-2" required />
                </div>
                <button type="submit" className="text-white bg-zinc-800 p-2 rounded text-sm">Submit</button>
            </form>
        </section>
    )
}
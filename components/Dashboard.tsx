"use client"

import { BASE_URL_SERVER } from "@/common";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard({ access_token }: { access_token: string }) {
    const [admin, setAdmin] = useState<User>();
    const router = useRouter();

    useEffect(() => {
        handleUserInfo()
    }, [])

    const handleUserInfo = async () => {
        const result = await (await fetch(BASE_URL_SERVER
            + "auth/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token
            },
            mode: "cors"
        })).json();

        if (result?.id) {
            setAdmin(result);

        }
        else {
            signOut();
        }
    }

    return (
        <section>
            <h1 className="mb-3">Super Admin Dashboard</h1>
            <p>Hello, {admin?.firstName}&nbsp;{admin?.lastName}</p>
            {admin?.superAdmin ? <div className="flex gap-4 my-8">
                <button
                    onClick={() => router.push("/admin/category")}
                    className="text-white bg-zinc-800 p-2 rounded text-sm">
                    Add Category
                </button>
                <button
                    onClick={() => router.push("/admin/blog")}
                    className="text-white bg-zinc-800 p-2 rounded text-sm">
                    Add Blog
                </button>
                <button
                    onClick={() => router.push("/admin/subscribers")}
                    className="text-white bg-zinc-800 p-2 rounded text-sm">
                    View Subscribers
                </button>
                <button
                    onClick={signOut}
                    className="text-white bg-zinc-800 p-2 rounded text-sm">
                    Signout
                </button>
            </div> : <p>You are not allowed to access this resource</p>}
        </section>
    )
}

export const signOut = () => {
    window.localStorage.removeItem("access_token");
    window.location.reload();
}
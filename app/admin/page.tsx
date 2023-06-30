"use client"

import Dashboard from "@/components/Dashboard";
import SigninForm from "@/components/SigninForm";
import { useEffect, useState } from "react";

export default function Admin() {
    const [access_token, setAccess_token] = useState<string | null>(null)
    useEffect(() => {
        setAccess_token(window.localStorage.getItem("access_token"));
    }, [])

    return (
        <section className="my-8 max-w-7xl mx-auto text-zinc-800 ">
            {access_token ? <Dashboard access_token={access_token} /> : <SigninForm />}
        </section>
    )
}
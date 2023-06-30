"use client"

import { BASE_URL_SERVER } from "@/common";
import { Subscriber } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { convertDate } from "@/helpers/dateHandler";

export default function Subscribers() {
    const [subscribers, setSubscribers] = useState<Subscriber[] | null>();
    const router = useRouter();

    useEffect(() => {
        handleFetchSubscribers();
    }, [])

    const handleFetchSubscribers = async () => {
        const result = await (await fetch(BASE_URL_SERVER
            + "subscriber/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("access_token"),
            },
            cache: "no-store",
            mode: "cors"
        })).json();

        if (result?.statusCode == 401) {
            window.localStorage.removeItem("access_token");
            router.push("/admin");
        }
        else {
            setSubscribers(result);
        }
    }

    return (
        <section className="my-8 max-w-7xl mx-auto text-zinc-800 ">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Subscribed on
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers?.map((subscriber, index) => (
                            <tr key={index} className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {subscriber.email}
                                </th>
                                <td className="px-6 py-4">
                                    {convertDate(subscriber.createdAt, "MM dd,yy")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
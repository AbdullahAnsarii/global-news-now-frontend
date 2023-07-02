"use client"
import dynamic from "next/dynamic";
import { BASE_URL_SERVER } from "@/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/helpers/slugify";
import { Category, UploadedImage } from "@/types";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { IKContext, IKUpload } from 'imagekitio-react';


export default function Blog() {
    const [categories, setCategories] = useState<Category[]>([])
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [categoryId, setCategoryId] = useState<number>();
    const [message, setMessage] = useState("");
    const router = useRouter();
    const urlEndpoint = 'https://ik.imagekit.io/globalnewsnow';
    const publicKey = 'public_Z45LJa4cyU3KNfm0AD7JQss7Fhg=';
    const authenticationEndpoint = 'https://globalnewsnow.cyclic.app/auth/imgkit';

    const onError = (err: any) => {
        console.log("Error", err);
        setMessage("Something bad happened")
        setTimeout(() => {
            setMessage("");
        }, 3000)
    };

    const onSuccess = (res: UploadedImage) => {
        setImage(res.url);
    };

    const fetchCategories = async () => {
        setCategories(await (await
            fetch(BASE_URL_SERVER
                + "category/find-by-filters?"
                + new URLSearchParams({
                    sortByField: "createdAt",
                }), {
                method: "GET",
            })).json())
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const handleCreateBlog = async (e: any) => {
        e.preventDefault()
        const result = await (await fetch(BASE_URL_SERVER
            + "blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("access_token"),
            },
            mode: "cors",
            body: JSON.stringify({ title, slug, content, image, categoryId })
        })).json();
        if (result?.id) {
            setMessage(result?.title + " blog created successfully");
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
            <form onSubmit={handleCreateBlog}>

                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-zinc-900">Title</label>
                    <input value={title} onChange={(e) => {
                        setTitle(e.target.value)
                        setSlug(slugify(e.target.value))
                    }}
                        id="title" className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded p-2 w-full" required />
                </div>

                <div className="mb-6">
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-zinc-900">slug</label>
                    <input value={slug}
                        disabled
                        id="slug" className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded p-2 w-full" required />
                </div>

                <p className="mt-16 font-bold">Category ({categories.find(category => category.id === categoryId)?.title})</p>

                {categories.map(link => (
                    <ul onClick={() => setCategoryId(link.id)} key={link.id} className="text-sm text-blue-700 cursor-pointer">
                        <li className='px-4 py-2 text-sm bg-zinc-200'>
                            {link.title}
                        </li>
                    </ul>
                ))}

                <div className="mb-10">
                    <p className="mt-6 font-bold">Content</p>
                    <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '400px' }} />
                </div>
                {/* @ts-ignore */}
                <IKContext
                    publicKey={publicKey}
                    urlEndpoint={urlEndpoint}
                    authenticationEndpoint={authenticationEndpoint}
                >
                    <p className="mt-16 font-bold">Upload blog image</p>
                    {/* @ts-ignore */}
                    <IKUpload
                        fileName="test-upload.png"
                        onError={onError}
                        //@ts-ignore
                        onSuccess={onSuccess}
                    />
                </IKContext>

                <button type="submit" className="block text-white bg-zinc-800 p-2 rounded text-sm mt-10">Submit</button>
            </form>
        </section>
    )
}
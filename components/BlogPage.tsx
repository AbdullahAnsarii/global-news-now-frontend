import { BASE_URL_SERVER } from "@/common";
import { createArrayFromNumber } from "@/helpers/arrayFromNumber";
import { convertDate } from "@/helpers/dateHandler";
import { Blog, Category } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage({ categorySlug, blogSlug }: { categorySlug: string, blogSlug: string }) {
    let blog: Blog | undefined = undefined;
    let categoryDetails: Category | undefined = undefined;
    let latestBlogs: Blog[] = [];

    const data = await Promise.all([
        await (await
            fetch(BASE_URL_SERVER
                + "blog/find-one-by-slug/"
                + blogSlug, {
                method: "GET",
                cache: "no-store"
            })).json(),
        await (await
            fetch(BASE_URL_SERVER
                + "category/find-one-by-slug/"
                + categorySlug, {
                method: "GET"
            })).json(),
        await (await
            fetch(BASE_URL_SERVER
                + "blog/find-by-filters?"
                + new URLSearchParams({
                    perPage: '5',
                    sortByField: "createdAt",
                    sortOrder: "desc"
                }), {
                method: "GET",
                cache: "no-store"
            })).json()
    ])

    blog = data[0];
    categoryDetails = data[1];
    latestBlogs = data[2];

    return (
        <section className="my-8 max-w-7xl mx-auto">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/" className="inline-flex items-center text-xs text-zinc-600 hover:text-zinc-900">
                            Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg aria-hidden="true" className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <a href={`/${categorySlug}`} className="ml-1 text-xs text-zinc-600 hover:text-zinc-900 md:ml-2">{categoryDetails?.title}</a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg aria-hidden="true" className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <span className="ml-1 text-xs text-zinc-500 md:ml-2 dark:text-zinc-400">{blog?.title}</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="w-full flex gap-12 my-8">
                <div className="w-[60%]">
                    <div className='relative h-[200px] md:h-[360px] w-full'>
                        <Image src={blog?.image || ""} alt={blog?.title || ""} title={blog?.title} fill style={{
                            objectFit: 'cover',
                            borderRadius: '0.25rem'
                        }} />
                    </div>
                    {blog?.createdAt && <p className="text-zinc-400 text-xs mt-2">{convertDate(blog.createdAt, "MM dd,yy")}</p>}
                    <h1 className="text-zinc-800 line-clamp-2 text-2xl font-bold my-4">{blog?.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: blog?.content || ""}} />
                </div>

                <div className="w-[40%] flex flex-col gap-10">
                    <div className="border-l-4 border-black">
                        <p className="p-2">Latest Articles</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {latestBlogs.map(blog => (
                            <Link key={blog.id} href={`/${categoryDetails?.slug}/${blog?.slug}`} >
                                <div className="flex gap-6 w-full">
                                    <div className='relative h-[80px] w-[25%]'>
                                        <Image src={blog?.image || ""} alt={blog?.title} title={blog?.title} fill style={{
                                            objectFit: 'cover',
                                            borderRadius: '0.25rem'
                                        }} />
                                    </div>
                                    <div className="w-[75%] flex flex-col gap-2">
                                        <p className="line-clamp-1 text-zinc-800">{blog.title}</p>
                                        <p className="text-zinc-400 text-xs">{convertDate(blog.createdAt, "MM dd,yy")}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
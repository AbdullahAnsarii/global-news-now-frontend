import { BASE_URL_SERVER } from "@/common";
import { createArrayFromNumber } from "@/helpers/arrayFromNumber";
import { convertDate } from "@/helpers/dateHandler";
import { Blog, Category } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryPage({ slug, searchParams }: { slug: string, searchParams: { [key: string]: string | string[] | undefined } }) {
    const categoryDetails: Category = await (await
        fetch(BASE_URL_SERVER
            + "category/find-one-by-slug/"
            + slug, {
            method: "GET",
        })).json()

    let blogs: Blog[] = [];
    let latestBlogs: Blog[] = [];
    let blogsCount: number = 0;

    const data = await Promise.all([
        await (await
            fetch(BASE_URL_SERVER
                + "blog/find-by-filters?"
                + new URLSearchParams({
                    categoryId: categoryDetails.id.toString(),
                    perPage: "5",
                    page: searchParams?.pageNumber ? searchParams?.pageNumber.toString() : "1",
                    sortByField: "createdAt",
                    sortOrder: "desc"
                }), {
                method: "GET",
                cache: "no-store"
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
            })).json(),
        await (await
            fetch(BASE_URL_SERVER
                + "blog/find-blog-count/"
                + categoryDetails.id, {
                method: "GET",
                cache: "no-store"
            })).json()
    ])
    blogs = data[0];
    latestBlogs = data[1];
    blogsCount = data[2];

    //for pagination
    const numberOfPages = Math.ceil(blogsCount / 5)
    const paginationArray = createArrayFromNumber(numberOfPages);

    return (
        <section className="my-8 text-zinc-800">
            <div className="bg-zinc-800">
                <h1 className="max-w-7xl mx-auto py-2 text-zinc-200 text-5xl font-bold">{categoryDetails.title}</h1>
            </div>

            {blogs.length > 0 && <div className="max-w-7xl mx-auto my-10">
                <Link href={`/${categoryDetails.slug}/${blogs[0]?.slug}`} >
                    <div className='relative h-[200px] md:h-[500px] w-full'>
                        <Image src={blogs[0]?.image || ""} alt={blogs[0]?.title} title={blogs[0]?.title} fill style={{
                            objectFit: 'cover',
                            borderRadius: '0.25rem'
                        }} />
                        <div className="absolute bottom-0 left-0 w-[50%] bg-white opacity-75 rounded-bl py-4 px-3">
                            <p className="line-clamp-3">{blogs[0]?.title}</p>
                        </div>
                    </div>
                </Link>
            </div>}

            <div className="max-w-7xl mx-auto my-8 w-full flex gap-12">
                {blogs.length > 1 &&
                    <div className="w-[60%] flex flex-col gap-10">
                        <div className="flex flex-wrap gap-6">
                            {blogs.slice(1).map(blog => (
                                <div key={blog.id} className='relative h-[100px] md:h-[calc(200px-1rem)] w-[calc(50%-0.75rem)]'>
                                    <Link href={`/${categoryDetails.slug}/${blog?.slug}`} >
                                        <Image src={blog?.image || ""} alt={blog?.title} title={blog?.title} fill style={{
                                            objectFit: 'cover',
                                            borderRadius: '0.25rem'
                                        }} />
                                        <div className="absolute bottom-0 left-0 w-[75%] bg-white opacity-75 rounded-bl py-3 px-3">
                                            <p className="line-clamp-3 text-xs">{blog?.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                        </div>
                        <nav aria-label="Page navigation example" className="self-center">
                            <ul className="inline-flex -space-x-px">
                                {Number(searchParams?.pageNumber) > 1 && <li>
                                    <Link
                                        href={`/${categoryDetails.slug}?pageNumber=${Number(searchParams?.pageNumber) - 1}`}
                                        className="px-3 py-2 ml-0 leading-tight text-zinc-500 bg-white border border-zinc-300 rounded-l hover:bg-zinc-100 hover:text-zinc-700">
                                        Previous
                                    </Link>
                                </li>}
                                {paginationArray.map(pageNumber => (
                                    <li key={pageNumber}>
                                        <Link
                                            href={`/${categoryDetails.slug}?pageNumber=${pageNumber}`}
                                            className={`${(Number(searchParams?.pageNumber ? searchParams?.pageNumber : 1) === pageNumber) ?
                                                "text-zinc-200 bg-zinc-800" : "text-zinc-800 bg-white hover:bg-zinc-800 hover:text-zinc-200"} border border-zinc-300  px-3 py-2 leading-tight`}>
                                            {pageNumber}
                                        </Link>
                                    </li>
                                ))}
                                {!(Number(searchParams?.pageNumber) >= numberOfPages) && <li>
                                    <Link
                                        href={`/${categoryDetails.slug}?pageNumber=${Number(searchParams?.pageNumber) + 1}`}
                                        className="px-3 py-2 leading-tight text-zinc-500 bg-white border border-zinc-300 rounded-r hover:bg-zinc-100 hover:text-zinc-700">
                                        Next
                                    </Link>
                                </li>}
                            </ul>
                        </nav>
                    </div>
                }

                <div className="w-[40%] flex flex-col gap-10">
                    <div className="border-l-4 border-black">
                        <p className="p-2">Latest Articles</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {latestBlogs.map(blog => (
                            <Link key={blog.id} href={`/${categoryDetails.slug}/${blog?.slug}`} >
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
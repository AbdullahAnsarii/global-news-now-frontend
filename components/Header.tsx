import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export async function Header({ headerLinks }: { headerLinks: Category[] }) {


    return (
        <header className='border-b border-slate-200'>
            <section className='flex justify-between max-w-7xl mx-auto py-2'>
                <div className='flex items-center gap-6 max-w-[800px] overflow-hidden'>
                    <Image src="/logo-black.svg" alt="Global News Now Logo" title="Global News Now Logo" width={60} height={60} />
                    <div className='h-full w-[1px] bg-slate-200' />
                    {headerLinks.slice(0, 5).map(link => (
                        <Link key={link.id} className='hover:text-slate-600 font-bold whitespace-nowrap' href={`/${link.slug}`}>
                            {link.title}
                        </Link>
                    ))}

                    <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-md focus:outline-none" type="button">
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                    </button>

                    <div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <div className="py-2">
                            <p className="block px-4 py-2 text-sm text-gray-700 font-bold">More categories</p>
                        </div>
                        {headerLinks.slice(5).map(link => (
                            <ul key={link.id} className="text-sm text-gray-700 " aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                    <Link key={link.id} className=' whitespace-nowrap block px-4 py-2' href={`/${link.slug}`}>
                                        {link.title}
                                    </Link>
                                </li>
                            </ul>
                        ))}

                    </div>

                </div>

                <div className='flex items-center gap-6'>

                    <form>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" className="min-w-[320px] focus:outline-none block w-full p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-sm" placeholder="Search Global News Now" required />
                            <button type="submit" className="text-slate-200 absolute right-0 bottom-0 bg-black hover:bg-slate-800 text-xs rounded-r-sm px-3 h-full">Search</button>
                        </div>
                    </form>

                    <Image src="/profile.svg" alt="Profile" title="Profile" width="30" height="30" />
                </div>
            </section>
            <Script strategy='beforeInteractive' src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.6/flowbite.min.js" />
        </header>
    )
}
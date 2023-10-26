import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export async function Header({ headerLinks }: { headerLinks: Category[] }) {

    return (
        <header className='border-b border-zinc-200 px-4 xl:px-0'>
            <section className='flex justify-between max-w-7xl mx-auto py-2'>
                <div className='flex items-center gap-6 max-w-[800px] overflow-hidden'>
                    <Link href="/">
                        <div className='relative h-[60px] w-[60px]'>
                            <Image src="/ngn-black.svg" alt="Global News Now Logo" title="Global News Now Logo" fill style={{
                                objectFit: 'contain',
                                borderRadius: '0.25rem'
                            }} />
                        </div>
                    </Link>
                    <div className='h-full w-[1px] bg-zinc-200' />
                    {headerLinks.slice(0, 5).map(link => (
                        <Link key={link.id} className='hover:text-zinc-600 whitespace-nowrap text-sm hidden md:inline' href={`/${link.slug}`}>
                            {link.title}
                        </Link>
                    ))}
                    {headerLinks.slice(0, 2).map(link => (
                        <Link key={link.id} className='hover:text-zinc-600 whitespace-nowrap text-sm inline md:hidden' href={`/${link.slug}`}>
                            {link.title}
                        </Link>
                    ))}

                    <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-zinc-900 bg-white rounded-md focus:outline-none" type="button">
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                    </button>

                    <div id="dropdownDotsHorizontal" className="z-10 hidden bg-zinc-50 divide-y divide-zinc-100 rounded-lg shadow w-44">
                        <div className="py-2">
                            <p className="block px-4 py-2 text-sm text-zinc-700 font-bold ">More categories</p>
                        </div>
                        {headerLinks.slice(5).map(link => (
                            <ul key={link.id} className="text-sm text-zinc-700  hidden md:inline" aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                    <Link key={link.id} className='whitespace-nowrap block px-4 py-2 text-sm' href={`/${link.slug}`}>
                                        {link.title}
                                    </Link>
                                </li>
                            </ul>
                        ))}
                        {headerLinks.slice(2).map(link => (
                            <ul key={link.id} className="text-sm text-zinc-700 inline md:hidden" aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                    <Link key={link.id} className='whitespace-nowrap block px-4 py-2 text-sm' href={`/${link.slug}`}>
                                        {link.title}
                                    </Link>
                                </li>
                            </ul>
                        ))}

                    </div>

                </div>

                <div className='items-center gap-6 hidden lg:flex'>

                    <form>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" className="min-w-[320px] focus:outline-none block w-full p-2 pl-10 text-xs text-zinc-900 border border-zinc-200 rounded-sm" placeholder="Search Global News Now" required />
                            <button type="submit" className="text-zinc-200 absolute right-0 bottom-0 bg-zinc-900 hover:bg-zinc-800 text-xs rounded-r-sm px-3 h-full">Search</button>
                        </div>
                    </form>

                    {/* <Image src="/profile.svg" alt="Profile" title="Profile" width="30" height="30" /> */}
                </div>
            </section>
            <Script strategy='beforeInteractive' src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.6/flowbite.min.js" />
        </header>
    )
}
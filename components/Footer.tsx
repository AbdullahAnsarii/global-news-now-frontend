import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";

export async function Footer({ headerLinks }: { headerLinks: Category[] }) {
    return (
        <footer className='bg-black'>
            <section className="flex gap-16 max-w-7xl mx-auto py-6">
                <div className='w-[50%] flex flex-col gap-16'>
                    <Image priority={true} src="/logo-white.svg" alt="Global News Now Logo" title="Global News Now Logo" width="120" height="120" />
                    <div className='flex flex-col gap-4'>
                        <p className='font-bold text-slate-200'>Explore</p>
                        <div className='flex gap-2'>
                            {headerLinks.slice(0, 5).map(link => (
                                <Link key={link.id} className='text-slate-200 hover:text-slate-50 text-xs border-r border-slate-200 pr-2' href={`/${link.slug}`}>
                                    {link.title}
                                </Link>

                            ))}
                        </div>

                    </div>
                </div>
                <div className='w-[50%] flex flex-col justify-between'>
                    <div className='flex flex-col gap-4'>
                        <p className='font-bold text-slate-200'>Subscribe</p>
                        <form>
                            <div className="flex items-center gap-2 flex-grow">
                                <input type="search" id="default-search" className="min-w-[400px] focus:outline-none block p-3 text-sm text-slate-200 bg-black border border-slate-200 rounded-sm" placeholder="Email address" required />
                                <button type="submit" className="bg-slate-200 hover:bg-slate-50 text-sm rounded-sm p-3">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p className='font-bold text-slate-200'>Follow us on social media</p>
                        <div className='flex gap-8'>
                            <Image src="/instagram.svg" alt="Instagram Logo" title="Instagram Logo" width="32" height="32" />
                            <Image src="/facebook.svg" alt="Facebook Logo" title="Facebook Logo" width="32" height="32" />
                            <Image src="/twitter.svg" alt="Twitter Now Logo" title="Twitter Now Logo" width="32" height="32" />
                        </div>
                    </div>
                </div>
            </section>
            <p className='text-xs text-slate-200 text-center border-t py-2'>Copyright &copy; {(new Date().getFullYear())} Global News Now</p>

        </footer>
    )
}
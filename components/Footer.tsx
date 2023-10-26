import { FACEBOOK_URL, INSTAGRAM_URL, MAIL_URL } from "@/common";
import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Subscribe } from "./Subscribe";

export async function Footer({ headerLinks }: { headerLinks: Category[] }) {
    return (
        <footer className='bg-zinc-900 px-4 xl:px-0'>
            <section className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto py-6">
                <div className='w-full lg:w-[50%] flex flex-col gap-16'>
                    <div className='relative h-[140px] w-[140px]'>
                        <Image src="/ngn.png" alt="Global News Now Logo" title="Global News Now Logo" fill style={{
                            objectFit: 'contain',
                            borderRadius: '0.25rem'
                        }} />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p className='font-bold text-zinc-200'>Explore</p>
                        <div className='flex gap-2'>
                            {headerLinks.slice(0, 5).map(link => (
                                <Link key={link.id} className='text-zinc-200 hover:text-zinc-50 text-xs border-r border-zinc-200 pr-2' href={`/${link.slug}`}>
                                    {link.title}
                                </Link>

                            ))}
                        </div>

                    </div>
                </div>
                <div className='w-full lg:w-[50%] flex flex-col gap-16 justify-between'>
                    <Subscribe />
                    <div className='flex flex-col gap-4'>
                        <p className='font-bold text-zinc-200'>Follow us on social media</p>
                        <div className='flex gap-8'>
                            <Link target="__blank" href={INSTAGRAM_URL}>
                                <Image src="/instagram.svg" alt="Instagram Logo" title="Instagram Logo" width="32" height="32" />
                            </Link>
                            <Link target="__blank" href={FACEBOOK_URL}>
                                <Image src="/facebook.svg" alt="Facebook Logo" title="Facebook Logo" width="32" height="32" />
                            </Link>
                            <Link target="__blank" href={MAIL_URL}>
                                <Image src="/email.svg" alt="Mail Logo" title="Mail Logo" width="36" height="36" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <p className='text-xs text-zinc-200 text-center border-t py-2'>Copyright &copy; {(new Date().getFullYear())} Global News Now</p>

        </footer>
    )
}
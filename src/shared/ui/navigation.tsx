'use client'

import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/context";
import { AlignJustify } from 'lucide-react';
import { usePathname } from "next/navigation";
import { colors } from "@/utils/colors";
import { useToggleState } from "..";

export const Navigation = () => {
    const pathname = usePathname();
    const { logout } = useSession();

    return (
        <div className="w-full h-full bg-white flex flex-col justify-between px-2 py-4 relative">
            <div className="flex flex-col justify-start gap-5 pt-10 relative">
                <figure>
                    <Image
                        src='/icons/legendLogo.png'
                        alt='Logo'
                        width={140}
                        height={140}
                    />
                </figure>
                <div className="flex flex-col justify-start gap-3">
                    <Link href='/' className={`flex items-center leading-none justify-start gap-1 text-sm ${pathname === '/' ? 'text-purple' : 'text-black'}`}>
                        <figure>
                            <Image
                                src={pathname === '/' ? '/icons/pwarehouse.svg' : '/icons/warehouse.svg'}
                                alt='Logo'
                                width={30}
                                height={30}
                            />
                        </figure>
                        Production
                    </Link>
                    <Link href='/machines' className={`flex items-center leading-none justify-start gap-1 text-sm ${pathname === '/machines' ? 'text-purple' : 'text-black'}`}>
                        <figure>
                            <Image
                                src={pathname === '/machines' ? '/icons/pmachines.svg' : '/icons/machines.svg'}
                                alt='Logo'
                                width={30}
                                height={30}
                            />
                        </figure>
                        Machines
                    </Link>
                    <Link href='/products' className={`flex items-center leading-none justify-start gap-1 text-sm ${pathname === '/products' ? 'text-purple' : 'text-black'}`}>
                        <figure>
                            <Image
                                src={pathname === '/products' ? '/icons/pproducts.svg' : '/icons/products.svg'}
                                alt='Logo'
                                width={30}
                                height={30}
                            />
                        </figure>
                        Products
                    </Link>
                </div>
            </div>
            <button className='w-full p-2 rounded bg-red text-white uppercase' onClick={logout}>Logout</button>
        </div>
    )
}

'use client'

import { useSession } from '@/context';
import { usePathname } from 'next/navigation';
import { Navigation } from '@/shared/ui/navigation';

export default function AppWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const { user } = useSession();

    const hideNavigation = pathname?.toLocaleLowerCase()?.includes('/login')

    if (!user) {
        return;
    }

    console.log(user)

    return (
        <main className={`w-full h-screen flex flex-col lg:flex-row gap-2 overflow-hidden md:ease-in-out md:duration-500 bg-black ${!hideNavigation && 'p-2'}`}>
            <nav className={`${hideNavigation ? 'hidden' : 'bg-white lg:h-full w-full lg:w-1/12 rounded p-2'}`}>
                <Navigation />
            </nav>
            <div className={`${hideNavigation ? 'w-full' : 'lg:w-11/12 rounded'}  h-full p-2 bg-grey`}>
                {children}
            </div>
        </main>
    )
}
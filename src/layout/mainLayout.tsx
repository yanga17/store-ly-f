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

    return (
        <main className={`w-full h-screen flex flex-col lg:justify-between lg:flex-row lg:gap-2 overflow-hidden md:ease-in-out md:duration-500 bg-black ${!hideNavigation && 'lg:p-2'}`}>
            <nav className={`${hideNavigation ? 'hidden' : 'slg:h-full w-full lg:w-1/12'}`}>
                <Navigation />
            </nav>
            <div className={`${hideNavigation ? 'w-full' : 'lg:w-11/12 lg:rounded'}  h-full bg-grey`}>
                {children}
            </div>
        </main >
    )
}
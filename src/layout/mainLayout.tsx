'use client'

import { colors } from '@/utils/colors';
import { useSession } from '@/context';
import { Toaster } from 'react-hot-toast';
import { AlignJustify, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Navigation, useToggleState } from '@/shared';

export default function AppWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const { user } = useSession();

    const { isLarge, toggleState } = useToggleState();

    const hideNavigation = pathname?.toLocaleLowerCase()?.includes('/login')

    const renderNavigation = () => {
        if (isLarge && user?.token !== null) {
            return (
                <nav className={`${hideNavigation ? 'hidden' : 'md:h-full w-full md:w-[12%]'}`}>
                    <Navigation />
                </nav>
            );
        }
    };

    return (
        <main className='w-full h-screen flex flex-col md:flex-row justify-start items-start overflow-hidden'>
            {renderNavigation()}
            <div className={`${hideNavigation ? 'w-full' : 'h-full w-full'} bg-grey p-2`}>
                {
                    user?.token !== null &&
                    <button className='absolute left-0 top-2 w-11 h-9 flex items-center justify-center bg-black rounded-e lg:hover:w-20 lg:ease-in-out lg:duration-500 cursor-pointer' onClick={toggleState}>
                        {
                            isLarge ?
                                <X size={30} strokeWidth={3} absoluteStrokeWidth color={colors[0]?.red} />
                                :
                                <AlignJustify size={30} strokeWidth={3} absoluteStrokeWidth color={colors[0]?.purple} />
                        }
                    </button>
                }
                {children}
            </div>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </main>
    )
}
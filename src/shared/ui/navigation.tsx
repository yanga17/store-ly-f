'use client'

import Link from "next/link";
import { useSession } from "@/context";
import { colors } from "@/utils/colors";
import { usePathname } from 'next/navigation';
import { CalendarClock, LayoutDashboard, LogOut, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const { user } = useSession()
  const pathname = usePathname();
  const { logout } = useSession();

  const MobileNavigation = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleVisibility = () => setIsOpen(!isOpen)

    return (
      <div className="lg:hidden flex relative p-4 bg-black text-white">
        <div className="w-full items-center justify-between flex">
          <p className="uppercase font-medium text-sm">Train Log</p>
          <LayoutDashboard size={25} strokeWidth={1.5} color={colors?.white} className="cursor-pointer" onClick={toggleVisibility} />
        </div>
        {
          isOpen &&
          <div className="text-white bg-black-dark absolute top-40 left-0 bottom-0 right-0 w-11/12 mx-auto h-[500px] rounded">
            <X size={40} strokeWidth={1.5} color={colors?.red} className="cursor-pointer absolute top-2 right-2" onClick={toggleVisibility} />
            <ul className="w-full h-full flex flex-col items-center justify-center gap-2">
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/check-in'>Attend</Link>
              </li>
            </ul>
          </div>
        }
      </div>
    )
  }

  const DesktopNavigation = () => {
    if (!user) {
      return;
    }
    const { role } = user

    return (
      <div className="hidden lg:flex flex-col justify-between gap-1 h-full w-full bg-black-dark rounded py-4">
        <ul className="flex flex-col justify-between gap-2 w-full">
          {
            role === 'Admin' &&
            <li className="m-0 p-2 flex items-center justify-start gap-1 uppercase cursor-pointer hover:bg-white ease-in-out duration-500 rounded group w-11/12 mx-auto">
              <LayoutDashboard size={25} strokeWidth={1} color={pathname === '/' ? colors?.purple : colors?.white} />
              <Link href='/' className="text-sm font-medium text-white group-hover:text-purple">Home</Link>
            </li>
          }
          <li className="m-0 p-2 flex items-center justify-start gap-1 uppercase cursor-pointer hover:bg-white ease-in-out duration-500 rounded group w-11/12 mx-auto">
            <CalendarClock size={25} strokeWidth={1} color={pathname === '/check-in' ? colors?.purple : colors?.white} />
            <Link href='/check-in' className="text-sm font-medium text-white group-hover:text-purple">Attend</Link>
          </li>
        </ul>
        <button className="gap-2 flex items-center justify-center w-10/12 mx-auto rounded p-2 bg-red text-white" onClick={logout}>
          <span className="text-white font-medium uppercase text-xs">Logout</span>
        </button>
      </div>
    )
  }

  console.log(user)

  return (
    <>
      <MobileNavigation />
      <DesktopNavigation />
    </>
  )
}

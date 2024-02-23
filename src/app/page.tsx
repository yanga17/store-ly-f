'use client'

import { AttendanceModule } from "@/modules";

export default function Home() {
  const headers = ['Name', 'Department', 'Attendance Time', 'Action']
  
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-2 p-2 rounded bg-grey text-white">
      <div className="w-full h-full rounded flex flex-col justify-start gap-2">
        <div className="flex items-center justify-between divide-x divide-gray-500 w-full bg-white text-black p-2 rounded">
          {headers?.map((header, index) => <p key={index + 1} className={`text-sm uppercase text-gray-500 font-medium w-${100 / headers?.length} w-full text-center`}>{header}</p>)}
        </div>
        <div className="h-full overflow-y-scroll flex flex-col justify-start gap-2 pr-1">
          <AttendanceModule />
        </div>
      </div>
    </section>
  );
}

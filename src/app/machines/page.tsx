'use client'

import { TableHeaderModule } from "@/shared";
import { MachinesModule } from "@/modules/machines/machines";
import { AssignManagerModule } from "@/modules/machines/forms/assignManager";

export default function Machines() {
    const headers = ['#', 'Product', 'Color', 'Start Time', 'Counter Reading Start', 'Operator', 'Action',]

    return (
        <section className="w-full h-full flex flex-col justify-start gap-2">
            <div className="w-full flex items-center justify-end self-end">
                <div className="w-1/4 flex items-center justify-end gap-2">
                    <p className="text-[13px] text-gray-500 font-medium uppercase w-1/2 text-right">Assign Shift Manager</p>
                    <AssignManagerModule />
                </div>
            </div>
            <TableHeaderModule headers={headers} />
            <MachinesModule />
        </section>
    );
}

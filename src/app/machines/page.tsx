'use client'

import { TableHeaderModule } from "@/shared";
import { MachinesModule } from "@/modules/machines/machines";

export default function Machines() {
    const headers = ['#', 'Product', 'Color', 'Start Time', 'Counter Reading Start', 'Operator', 'Action']

    return (
        <section className="w-full h-full flex flex-col justify-start gap-2">
            <TableHeaderModule headers={headers} />
            <MachinesModule />
        </section>
    );
}

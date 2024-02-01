'use client'

import { ProductionModule, TableHeaderModule } from "@/shared";

export default function Home() {
  const headers = ['Machine', 'Cycle Time (sec)', 'Target Time (sec)', 'Power Usage (kwh)', 'Efficiency (%)', '#']

  return (
    <section className="w-full h-full flex flex-col justify-start gap-2">
      <TableHeaderModule headers={headers} />
      <ProductionModule />
    </section>
  );
}

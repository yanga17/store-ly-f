'use client'

import { ViewProductsModule } from "@/modules/products"
import { TableHeaderModule } from "@/shared"

export default function Products() {
  const headers = ['#', 'Product Image', 'Product Name', 'Action']

  return (
    <section className="w-full h-full flex flex-col justify-start gap-2">
      <TableHeaderModule headers={headers} />
      <ViewProductsModule />
    </section>
  )
}
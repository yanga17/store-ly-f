'use client'

import { ViewProductsModule } from "@/modules/products"
import { Tab, Tabs } from "@/shared/ui/tab";

export default function Products() {

  const tabs: Tab[] = [
    {
      label: 'View Products',
      content: <ViewProductsModule />
    },
    {
      label: 'Add Product',
      content: <div>Content of Tab 2</div>
    }
  ];

  return (
    <section className="w-full h-full flex flex-col justify-start gap-2">
      <Tabs tabs={tabs} />
    </section>
  )
}
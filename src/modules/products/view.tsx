'use client'

import { useQuery } from "@/hooks/useQuery"
import { TableHeaderModule } from "@/shared"

interface Products {
    uid: number | null;
    image: string | null;
    product_name: string | null;
}

type ExpectedData = Products[];

export const productList = () => {
    const url = `api/v1/product/getproducts`;
    const { data, loading, error } = useQuery<ExpectedData>(url);

    if (loading) {
        const loadingUI = new Array(30).fill(null);

        return (
            <>
                {loadingUI?.map((index) =>
                    <div className="flex items-center justify-between bg-white p-2 rounded" key={index}>
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[15%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-8 w-[15%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[15%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[15%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[15%] mx-auto" />
                    </div>
                )}
            </>
        )
    }

    if (!data || error) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <div className='bg-white w-6/12 h-32 rounded shadow flex items-center justify-center'>
                    <p className='uppercase'>Please refresh the page</p>
                </div>
            </div>
        )
    }

    const products: any = data?.map((property) => ({
        id: property?.uid,
        photoURL: property?.image,
        name: property?.product_name,
    }))

    return (
        <div className="w-full h-full overflow-y-scroll pr-1">products available</div>
    )
}


export const ViewProductsModule = () => {
    const headers = ['#', 'Image', 'Name', 'Description', 'Action']

    return (
        <div className="flex flex-col justify-start gap-2">
            <TableHeaderModule headers={headers} />
            {productList()}
        </div>
    )
}
'use client'

import Image from 'next/image';
import { useState } from 'react';
import { colors } from '@/utils/colors';
import { ArrowDown, Utensils } from 'lucide-react';
import { useQuery } from '@/hooks/useQuery';
import { Products } from '@/hooks';

interface PageProps {
    operator: string;
    image: string | null;
    act_time_cyc: number | null;
    consumption_kwh: string | null;
    count_per_shot: string;
    machine_number: string;
    machine_status: string;
    master_batch: number | null;
    product_code: string;
    product_name: string;
    target_time: number | null;
    team_leader: string | null;
    cycle_counts: number | null;
    productivity_percent: number | null;
}

type ExpectedData = PageProps[];

export const ViewProductsModule = () => {
    const [isExpanded, setIsExpanded] = useState(0)

    const toggleAccordion = (ref: number) => setIsExpanded(ref)


    const products = Products()

    console.log(products)

    const url = `api/v1/machine/getproductionview`
    const { data, loading, error } = useQuery<ExpectedData>(url)

    const loadingUI = new Array(30).fill(null);

    if (!products) {
        return (
            <>
                {loadingUI?.map((index) =>
                    <div className="flex items-center justify-between bg-white p-2 rounded" key={index}>
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[23%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-8 w-[23%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[23%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[23%] mx-auto" />
                    </div>
                )}
            </>
        )
    }

    const productionData = data?.map((property, index) => ({
        id: index + 1,
        teamLeader: property?.team_leader ? property.team_leader : '--:--',
        operator: property?.operator ? property?.operator : '--:--',
        image: property?.image,
        targetTime: property?.target_time ? property?.target_time : '--:--',
        cycleTime: property?.act_time_cyc ? property?.act_time_cyc?.toFixed(2) : 0,
        cycleCounts: property?.cycle_counts ? property?.cycle_counts : '--:--',
        masterBatch: property?.master_batch ? property?.master_batch : '--:--',
        productCode: property?.product_code ? property?.product_code : '--:--',
        productName: property?.product_name ? property?.product_name : '--:--',
        powerUsage: property?.consumption_kwh ? property?.consumption_kwh : '--:--',
        countPerShot: property?.count_per_shot ? property?.count_per_shot : '--:--',
        machineNumber: property?.machine_number ? property?.machine_number : '--:--',
        machineStatus: property?.machine_status,
        efficiency: property?.productivity_percent ? property?.productivity_percent : 0,

        //UI
        isActive: Number(property?.act_time_cyc) === 0 ? 'In-Active' : 'Active',
    }))

    return (
        <div className='w-full h-full overflow-y-scroll flex flex-col justify-start gap-2 pr-1'>
            {products?.map(({ image, uid, product_name }, index) =>
                <div className={`ease-in-out duration-500 bg-white rounded w-full flex flex-col justify-start gap-2 border-2 ${isExpanded === Number(uid) && 'border-green'}`} key={index}>
                    <div className="w-full bg-white p-2 rounded lg:cursor-pointer flex items-center justify-between relative divide-x divide-greyMid" onClick={() => toggleAccordion(Number(uid))}>
                        <div className='flex items-center justify-center gap-1 w-[25%]'>
                            <p className={`font-medium w-32 p-2 text-center rounded text-gray-500 text-sm`}>{index + 1}</p>
                        </div>
                        <div className='flex items-center justify-center gap-1 w-[25%]'>
                            {image ?
                                <figure className='h-20 w-20 flex items-center justify-center overflow-hidden'>
                                    <Image
                                        src={`data:image/png;base64,${image}`}
                                        alt={`${product_name}`}
                                        height={60}
                                        width={60}
                                        className='object-contain'
                                    />
                                </figure>
                                :
                                <Utensils size={20} strokeWidth={2} absoluteStrokeWidth color={isExpanded === Number(uid) ? colors[0]?.red : colors[0]?.green} className={`lg:ease-in-out lg:duration-300`} />
                            }
                        </div>
                        <div className='flex items-center justify-center gap-1 w-[25%]'>
                            <p className='text-gray-500 text-sm font-medium'>{product_name}</p>
                        </div>
                        <div className='flex items-center justify-center gap-1 w-[25%]'>
                            <ArrowDown size={20} strokeWidth={2} absoluteStrokeWidth color={isExpanded === Number(uid) ? colors[0]?.red : colors[0]?.green} className={`${isExpanded === Number(uid) && 'rotate-180'} lg:ease-in-out lg:duration-300`} />
                        </div>
                    </div>
                    <hr className='w-11/12 mx-auto' />
                    {
                        isExpanded === Number(uid) &&
                        <div className='w-full p-2 flex items-start justify-start flex-wrap gap-y-4'>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Product Code:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Test Machine:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Weight:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Cool Time:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Charging Time:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Target Time:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Cavity:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Quantity Per Palette:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>

                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Total Weight:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Master Batch:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Volume:</p>
                                <p className='text-black font-medium'>--:--</p>
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}
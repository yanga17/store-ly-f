'use client'

import Image from 'next/image';
import { useState } from 'react';
import { Products } from '@/hooks';
import { colors } from '@/utils/colors';
import { Eye, EyeOff, Pencil, Utensils } from 'lucide-react';
import Link from 'next/link';
import { TableHeaderModule } from '@/shared';
import { wmmHeaders } from '@/shared/tools/app-variables';

export const ViewProductsModule = () => {
    const [isExpanded, setIsExpanded] = useState(0)

    const toggleAccordion = (ref: number) => setIsExpanded(ref)

    const products = Products()

    if (!products) {
        const loadingUI = new Array(30).fill(null);

        return (
            <div className='flex flex-col justify-start gap-3'>
                <TableHeaderModule headers={wmmHeaders[0]?.headers} />
                {loadingUI?.map((index) =>
                    <div className="flex items-center justify-between bg-white p-2 rounded divide-x divide-greyMid" key={index}>
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[23%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-8 w-[23%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[23%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[23%] mx-auto" />
                    </div>
                )}
            </div>
        )
    }

    console.log(products)

    return (
        <div className='w-full h-screen flex flex-col justify-start gap-3 overflow-y-scroll pb-16'>
            <TableHeaderModule headers={wmmHeaders[0]?.headers} />
            <div className='w-full h-full pb-30 overflow-y-scroll flex flex-col justify-start gap-2 pr-1 pb-30'>
                {products?.map(({ image, uid, product_name, amount_per_pallet, charging_time, cool_time, count_per_shot, enabled, master_batch, product_code, target_time, test_run_machine, total_weight, volume, weight }, index) =>
                    <div className={`ease-in-out duration-500 bg-white rounded w-full flex flex-col justify-start gap-2 border-2 ${isExpanded === Number(uid) && 'border-green'}`} key={uid}>
                        <div className="w-full bg-white p-2 rounded lg:cursor-pointer flex items-center justify-between relative divide-x divide-greyMid" >
                            <div className='flex items-center justify-center gap-1 w-[25%]'>
                                <p className={`font-medium w-32 p-2 text-center rounded ${isExpanded === uid ? 'text-4xl text-green' : 'text-sm text-gray-500'}`}>{index + 1}</p>
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
                            <div className='flex items-center justify-center gap-6 w-[25%]'>
                                <Link href={`/products/${uid}`}>
                                    <Pencil size={30} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.purple} className={`lg:ease-in-out lg:duration-300`} />
                                </Link>
                                {
                                    isExpanded === uid ?
                                        <EyeOff size={30} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.red} className={`lg:ease-in-out lg:duration-300`} onClick={() => toggleAccordion(Number(uid))} />
                                        :
                                        <Eye size={30} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.green} className={`${isExpanded === Number(uid) && 'rotate-180'} lg:ease-in-out lg:duration-300`} onClick={() => toggleAccordion(Number(uid))} />

                                }
                            </div>
                        </div>
                        <hr className='w-11/12 mx-auto' />
                        {
                            isExpanded === Number(uid) &&
                            <div className='w-full p-2 flex items-start justify-start flex-wrap gap-y-4'>
                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Product Code:</p>
                                    <p className='text-black font-medium'>{product_code}</p>
                                </div>
                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Test Machine:</p>
                                    <p className='text-black font-medium'>{test_run_machine}</p>
                                </div>
                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Weight <span className='text-gray-500 text-xs'>(g)</span>:</p>
                                    <p className='text-black font-medium'>{weight}</p>
                                </div>
                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Cool Time <span className='text-gray-500 text-xs'>(sec)</span>:</p>
                                    <p className='text-black font-medium'>{cool_time}</p>
                                </div>
                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Charging Time <span className='text-gray-500 text-xs'>(sec)</span>:</p>
                                    <p className='text-black font-medium'>{charging_time}</p>
                                </div>
                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Target Time <span className='text-gray-500 text-xs'>(sec)</span>:</p>
                                    <p className='text-black font-medium'>{target_time}</p>
                                </div>
                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Cavity:</p>
                                    <p className='text-black font-medium'>{count_per_shot}</p>
                                </div>
                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Quantity Per Palette:</p>
                                    <p className='text-black font-medium'>{amount_per_pallet}</p>
                                </div>

                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Total Weight <span className='text-gray-500 text-xs'>(g)</span>:</p>
                                    <p className='text-black font-medium'>--:--</p>
                                </div>
                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Master Batch <span className='text-gray-500 text-xs'>(%)</span>:</p>
                                    <p className='text-black font-medium'>{master_batch}</p>
                                </div>
                                <div className='w-1/4'>
                                    <p className='text-gray-500 font-medium text-sm '>Volume <span className='text-gray-500 text-xs'>(L)</span>:</p>
                                    <p className='text-black font-medium'>{volume}</p>
                                </div>
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}
'use client'

import Image from 'next/image';
import { useState } from 'react';
import { colors } from '@/utils/colors';
import { ArrowDown } from 'lucide-react';
import { useQuery } from '@/hooks/useQuery';

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

export const ProductionModule = () => {
    const [isExpanded, setIsExpanded] = useState(0)

    const toggleAccordion = (ref: number) => setIsExpanded(ref)

    const url = `api/v1/machine/getproductionview`
    const { data, loading, error } = useQuery<ExpectedData>(url)

    const loadingUI = new Array(30).fill(null);

    if (loading) {
        return (
            <>
                {loadingUI?.map((index) =>
                    <div className="flex items-center justify-between bg-white p-2 rounded" key={index}>
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[15%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-8 w-[15%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[15%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[15%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[15%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[15%] mx-auto" />
                    </div>
                )}
            </>
        )
    }

    if (error || !data) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <div className='bg-white w-6/12 h-32 rounded shadow flex items-center justify-center'>
                    <p className='uppercase'>Please refresh the page</p>
                </div>
            </div>
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
            {productionData?.map(({ operator, machineNumber, machineStatus, masterBatch, productCode, image, productName, cycleCounts, isActive, cycleTime, targetTime, powerUsage, efficiency, teamLeader, countPerShot }, index) =>
                <div className={`ease-in-out duration-500 bg-white rounded w-full flex flex-col justify-start gap-2 border-2 ${isExpanded === Number(machineNumber) && 'border-green'}`} key={index}>
                    <div className="w-full bg-white p-2 rounded lg:cursor-pointer flex items-center justify-between relative divide-x divide-greyMid" onClick={() => toggleAccordion(Number(machineNumber))}>
                        <div className='flex items-center justify-start gap-1 w-[16.66%]'>
                            <span className={`w-10 ${Number(machineStatus) === 1 ? 'bg-green' : 'bg-red'} rounded text-white text-center p-2 uppercase font-bold text-lg`}>{machineNumber}</span>
                            <figure className='h-20 w-20 flex items-center justify-center overflow-hidden'>
                                <Image
                                    src={`data:image/png;base64,${image}`}
                                    alt={`${productName}`}
                                    height={50}
                                    width={50}
                                    className='object-contain'
                                />
                            </figure>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <p className='leading-none text-gray-500 text-sm font-medium text-left'>{productName?.slice(0, 15)}</p>
                                <p className='leading-none text-gray-500 text-xs font-medium text-left'>{productCode}</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-center gap-1 w-[16.66%]'>
                            <p className={`font-medium w-32 p-2 text-center rounded text-white ${(Number(machineStatus) === 1 && Number(cycleTime) < Number(targetTime)) ? 'bg-green' : (Number(machineStatus) === 1 && Number(cycleTime) > Number(targetTime)) ? 'bg-yellow' : 'bg-red'}`}>{Number(machineStatus) === 1 ? cycleTime : 'In-Active'}</p>
                        </div>
                        <div className='flex items-center justify-center gap-1 w-[16.66%]'>
                            <p className='text-black font-medium'>{targetTime}</p>
                        </div>
                        <div className='flex items-center justify-center gap-1 w-[16.66%]'>
                            <p className='text-black font-medium'>{powerUsage}</p>
                        </div>
                        <div className='flex items-center justify-center gap-1 w-[16.66%]'>
                            <p className={`text-black font-medium`}>{efficiency}</p>
                        </div>
                        <div className='flex items-center justify-center gap-1 w-[16.66%]'>
                            <ArrowDown size={20} strokeWidth={2} absoluteStrokeWidth color={isExpanded === Number(machineNumber) ? colors[0]?.red : colors[0]?.green} className={`${isExpanded === Number(machineNumber) && 'rotate-180'} lg:ease-in-out lg:duration-300`} />
                        </div>
                    </div>
                    <hr className='w-11/12 mx-auto' />
                    {
                        isExpanded === Number(machineNumber) &&
                        <div className='w-full p-2 flex items-start justify-start flex-wrap gap-y-4'>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Shift Manager:</p>
                                <p className='text-black font-medium'>{teamLeader}</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Operator:</p>
                                <p className='text-black font-medium'>{operator}</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Parts:</p>
                                <p className='text-black font-medium'>{countPerShot}</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Product Name:</p>
                                <p className='text-black font-medium'>{productName}</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Master Batch:</p>
                                <p className='text-black font-medium'>{masterBatch}</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Active / In-Active:</p>
                                <p className='text-black font-medium'>{isActive}</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Target Time:</p>
                                <p className='text-black font-medium'>{targetTime}</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Cycle Counts:</p>
                                <p className='text-black font-medium'>{cycleCounts}</p>
                            </div>

                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Productivity Percentage:</p>
                                <p className='text-black font-medium'>{efficiency}</p>
                            </div>
                            <div className='w-1/4'>
                                <p className='text-gray-500 font-medium text-sm '>Consumption:</p>
                                <p className='text-black font-medium'>{powerUsage}</p>
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}
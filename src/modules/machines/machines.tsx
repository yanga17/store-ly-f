'use client'

import { useState } from "react";
import { colors } from "@/utils/colors";
import { useQuery } from "@/hooks/useQuery";
import { EndRun } from "./forms/end-run";
import { AddLog } from "./forms/add-log";
import { StartRun } from "./forms/start-run";
import { AssignOperatorModule } from "./forms/assignOperator";
import { ArrowDown, PlayCircle, StopCircle, NotebookPen } from 'lucide-react';

export interface MachineProps {
    id: number | null
    operator: string;
    uid: number | null;
    shift: number | null;
    cavity: number | null;
    machine_name: string;
    colour: string | null;
    machine_number: string;
    team_leader: string | null;
    product_name: string | null;
    start_up_time: string | null;
    counter_reading_start: number | null;
}

type ExpectedData = MachineProps[];

export const MachinesModule = () => {
    const [isExpanded, setIsExpanded] = useState(0)
    const [action, setAction] = useState<string>('start')

    const toggleAccordion = (ref: number, action: string) => {
        setIsExpanded(ref)
        setAction(action)
    }

    const closeAccordion = () => {
        setIsExpanded(0)
        setAction('start')
    }

    const url = `api/v1/machine/getalltempmachines`
    const { data, loading, error } = useQuery<ExpectedData>(url)

    const loadingUI = new Array(30).fill(null);

    if (loading) {
        return (
            <>
                {loadingUI?.map((index) =>
                    <div className="flex items-center justify-between bg-white p-2 rounded" key={index}>
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[12%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[12%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[12%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[12%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[12%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[12%] mx-auto" />
                        <div className="rounded bg-grey-darker animate-pulse py-3 w-[12%] mx-auto" />
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

    const machinesData = data?.map((property) => ({
        id: property?.uid,
        shift: property?.shift,
        cavity: property?.cavity,
        colour: property?.colour ? property?.colour : '--:--',
        operator: property?.operator,
        teamLeader: property?.team_leader,
        machineName: property?.machine_name,
        productName: property?.product_name ? property?.product_name : '--:--',
        machineNumber: property?.machine_number,
        startReading: property?.counter_reading_start ? property?.counter_reading_start : '--:--',
        startTime: property?.start_up_time?.slice(0, 19).replace("T", " ") ? property?.start_up_time : '--:--',
    }))

    return (
        <div className="flex flex-col justify-start gap-2 overflow-y-scroll w-full h-full">
            {machinesData?.map(({ id, machineNumber, productName, startTime, colour, startReading, operator, machineName }, index) =>
                <div className={`ease-in-out duration-500 bg-white rounded w-full flex flex-col justify-start gap-2 border-2 z-8 ${isExpanded === Number(machineNumber) && 'border-green'}`} key={index}>
                    <div className="w-full bg-white p-2 rounded lg:cursor-pointer flex items-center justify-between divide-x divide-greyMid relative" >
                        <div className='flex items-center justify-start gap-1 w-[14.28%]'>
                            <p className={`font-medium text-gray-500 p-2 text-center w-full ${isExpanded === Number(machineNumber) ? 'text-4xl text-green' : 'text-sm'}`}>{machineNumber}</p>
                        </div>
                        <div className='flex items-center justify-start gap-1 w-[14.28%]'>
                            <p className={`font-medium text-sm text-gray-500 p-2 text-center w-full`}>{isExpanded === Number(machineNumber) ? productName : `${productName?.slice(0, 15)}...`}</p>
                        </div>
                        <div className='flex items-center justify-start gap-1 w-[14.28%]'>
                            <p className={`font-medium text-sm text-gray-500 p-2 text-center w-full`}>{isExpanded === Number(machineNumber) ? colour : `${colour?.slice(0, 20)}...`}</p>
                        </div>
                        <div className='flex items-center justify-start gap-1 w-[14.28%]'>
                            <p className={`font-medium text-sm text-gray-500 p-2 text-center w-full`}>{startTime?.slice(10, 19)?.replace('T', ' ')}</p>
                        </div>
                        <div className='flex items-center justify-start gap-1 w-[14.28%]'>
                            <p className={`font-medium text-sm text-gray-500 p-2 text-center w-full`}>{startReading}</p>
                        </div>
                        <div className='flex items-center justify-start gap-1 w-[14.28%]'>
                            {startTime !== '--:--' ? <AssignOperatorModule clientID={machineNumber} operator={operator} /> : <p className="text-sm text-gray-500 font-medium w-full text-center">--:--</p>}
                        </div>
                        <div className='flex items-center justify-center gap-1 w-[14.28%]'>
                            {startTime !== '--:--' ?
                                <div className="w-full flex items-center justify-center gap-1 md:gap-2">
                                    <NotebookPen size={38} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.purple} className={`lg:ease-in-out lg:duration-300`} onClick={() => toggleAccordion(Number(id), 'log')} />
                                    <StopCircle size={40} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.red} className={`lg:ease-in-out lg:duration-300`} onClick={() => toggleAccordion(Number(id), 'end')} />
                                </div>
                                :
                                <PlayCircle size={43} strokeWidth={2} absoluteStrokeWidth color={colors[0]?.green} className={`lg:ease-in-out lg:duration-300`} onClick={() => toggleAccordion(Number(id), 'start')} />
                            }
                        </div>
                        <ArrowDown size={20} strokeWidth={2} absoluteStrokeWidth color={isExpanded === Number(machineNumber) ? colors[0]?.red : colors[0]?.green} className={`lg:ease-in-out lg:duration-300 absolute w-10 right-2 ${isExpanded === Number(machineNumber) && 'rotate-180'} hidden xl:flex`} />
                    </div>
                    <hr className='w-11/12 mx-auto' />
                    {isExpanded === Number(machineNumber) && (action === 'start' ? <StartRun onclose={closeAccordion} client={machineName} clientID={machineNumber} /> : action === 'log' ? <AddLog onclose={closeAccordion} client={machineName} clientID={machineNumber} /> : action === 'end' ? <EndRun onclose={closeAccordion} client={machineName} clientID={machineNumber} /> : null)}
                </div>
            )}
        </div>
    )
}
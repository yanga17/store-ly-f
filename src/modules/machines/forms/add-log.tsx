'use client'

import axios from "axios";
import { useState } from "react";
import { Dropdown } from "@/shared";
import Validator from "validatorjs";
import { toast } from "react-hot-toast";
import { apiEndPoint } from "@/utils/colors";
import { wmmlogOptions } from "@/shared/tools/app-variables";

const rules = {
    startTime: 'required',
    endTime: 'required',
    stoppageReason: 'required',
};

interface Errors {
    [key: string]: string[];
}

interface AddLogProps {
    onclose: () => void;
    client: string,
    clientID: string
}

export const AddLog: React.FunctionComponent<AddLogProps> = ({ onclose, clientID }) => {
    const [data, setData] = useState({
        startTime: null,
        endTime: null,
        stoppageReason: null,
        isLoading: false
    })

    const [errors, setErrors] = useState<Errors>({});

    const assignStartDateTime = (e: any) => setData({ ...data, startTime: e.target.value?.replace('T', ' ') });
    const assignEndDateTime = (e: any) => setData({ ...data, endTime: e.target.value?.replace('T', ' ') });

    const renderStoppageOptions = () => {
        const assignReason = (option: any) => setData({ ...data, stoppageReason: option?.name });

        if (!wmmlogOptions) {
            return <div className="p-3 border w-full bg-grey-darker animate-pulse rounded h-[50px]" />
        }
        else {
            const data: any = wmmlogOptions

            return <Dropdown options={data} onSelect={assignReason} />
        }
    }

    const AddLog = async () => {

        const validateLogs = new Validator(data, rules);

        if (validateLogs.fails()) {
            setErrors(validateLogs.errors.all());
            return;
        }

        if (validateLogs.passes()) {

            setErrors({})
            setData({ ...data, isLoading: true })

            const logs = {
                machine_number: clientID,
                start_up_time: data?.startTime,
                stoppage_time: data?.endTime,
                stoppage_reason: data?.stoppageReason,
            }

            try {
                const url = `api/v1/machine/insertlog`
                const response = await axios.post(`${apiEndPoint}/${url}`, logs)

                if (response?.data === "Report created successfully") {
                    toast('Logs saved successfully',
                        {
                            icon: '✅',
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },

                            duration: 3000,
                        }
                    );

                    setData({ ...data, isLoading: true })

                    onclose()
                }
                else {
                    toast('Failed to save log, please try again',
                        {
                            icon: '❌',
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },

                            duration: 3000,
                        }
                    );

                    setData({ ...data, isLoading: true })
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="p-2">
            <div className='w-full p-2 flex items-start justify-start flex-wrap gap-y-4 gap-x-2 md:gap-x-4'>
                <div className='w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Start Time</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1"
                        type='datetime-local'
                        name="startTime"
                        onChange={(e) => assignStartDateTime(e)}
                    />
                    {errors.startTime && <span className="text-red text-sm">{errors.startTime[0]}</span>}
                </div>
                <div className='w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Stoppage Time</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1"
                        type='datetime-local'
                        name="endTime"
                        onChange={(e) => assignEndDateTime(e)}
                    />
                    {errors.endTime && <span className="text-red text-sm">{errors.endTime[0]}</span>}
                </div>
                <div className='w-[24%]'>
                    <div className="relative flex flex-col justify-start items-start gap-1">
                        <p className='text-gray-500 font-medium text-sm '>Select A Reason</p>
                        {renderStoppageOptions()}
                        {errors.stoppageReason && <span className="text-red text-sm">{errors.stoppageReason[0]}</span>}
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-between">
                <button className="bg-red hover:bg-white hover:text-red border-2 hover:border-red border-white w-40 uppercase text-sm font-medium text-white p-2 rounded cursor-pointer ease-in-out duration-300 outline-none" onClick={onclose}>Cancel</button>
                <button className="bg-green hover:bg-white hover:text-green border-2 hover:border-green border-white w-40 uppercase text-sm font-medium text-white p-2 rounded cursor-pointer ease-in-out duration-300 outline-none" onClick={AddLog}>{data?.isLoading ? 'Adding Log...' : 'Add Log'}</button>
            </div>
        </div>
    )
}

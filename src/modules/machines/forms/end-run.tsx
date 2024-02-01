'use client'

import axios from "axios";
import { useState } from "react";
import { Dropdown } from "@/shared";
import Validator from "validatorjs";
import { toast } from "react-hot-toast";
import { useInputHandler } from "@/hooks";
import { apiEndPoint } from "@/utils/colors";
import { wmmGeneralOptions } from "@/shared/tools/app-variables";

const rules = {
    reading: 'required',
    lumps: 'required',
    rejects: 'required',
    purging: 'required',
    time: 'required',
    reason: 'required'
};

interface Errors {
    [key: string]: string[];
};

interface EndRunProps {
    onclose: () => void;
    client: string,
    clientID: string
};

export const EndRun: React.FunctionComponent<EndRunProps> = ({ onclose, clientID }) => {
    const [data, setData] = useState({
        reading: null,
        lumps: null,
        rejects: null,
        purging: null,
        time: null,
        reason: null,
        isLoading: false
    });

    const [errors, setErrors] = useState<Errors>({});

    const { handleChange, inputValues } = useInputHandler();

    const assignDateTime = (e: any) => setData({ ...data, time: e.target.value });

    const renderStoppageReasons = () => {
        const assignProduct = (option: any) => setData({ ...data, reason: option?.name });

        if (!wmmGeneralOptions) {
            return <div className="p-3 border w-full bg-grey-darker animate-pulse rounded h-[50px]" />
        }
        else {
            const availableProducts = wmmGeneralOptions?.map((property) => ({
                id: property?.id,
                photoURL: 'clear',
                name: property?.name,
            }))

            const data: any = availableProducts

            return <Dropdown options={data} onSelect={assignProduct} />
        }
    }

    const endRun = async () => {
        const shiftData = {
            ...data,
            lumps: inputValues?.lumps,
            reading: inputValues?.reading,
            rejects: inputValues?.rejects,
            purging: inputValues?.purging,
        };

        const validateLogs = new Validator(shiftData, rules);

        if (validateLogs.fails()) {
            setErrors(validateLogs.errors.all());
            return;
        }

        if (validateLogs.passes()) {

            setErrors({})
            setData({ ...data, isLoading: true })

            const shiftEntry = {
                end_time: data?.time,
                lumps: inputValues?.lumps,
                rejects: inputValues?.rejects,
                purging: inputValues?.purging,
                stoppage_reason: data?.reason,
                counter_reading_end: inputValues?.reading,
            }

            try {
                const url = `api/v1/machine/updateinjection/${clientID}`
                const response = await axios.put(`${apiEndPoint}/${url}`, shiftEntry)

                if (response?.data.message === 'Success') {

                    const url = `api/v1/machine/clearinjectiontemp/${clientID}`
                    const response = await axios.put(`${apiEndPoint}/${url}`)

                    if (response?.data?.message === "Success") {
                        toast('Shift ended successfully',
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
                        toast('Failed to end run, please try again',
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
                else {
                    toast('Failed to end run, please try again',
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
                toast('Failed to end run, please try again',
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
            }
        }
    }

    return (
        <div className="p-2">
            <form className='w-full p-2 flex items-start justify-start flex-wrap gap-y-4 gap-x-2 md:gap-x-4'>
                <div className='w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>End Counter Reading</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1"
                        type='number'
                        name="reading"
                        placeholder="1285479"
                        value={inputValues.reading || ''}
                        onChange={(e) => handleChange('reading', e.target.value)}
                    />
                    {errors.reading && <span className="text-red text-sm">{errors.reading[0]}</span>}
                </div>
                <div className='w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Lumps</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1"
                        type='number'
                        name="lumps"
                        placeholder="1"
                        value={inputValues.lumps || ''}
                        onChange={(e) => handleChange('lumps', e.target.value)}
                    />
                    {errors.lumps && <span className="text-red text-sm">{errors.lumps[0]}</span>}
                </div>
                <div className='w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Rejected Units</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1"
                        type='number'
                        name="rejects"
                        placeholder="1289"
                        value={inputValues.rejects || ''}
                        onChange={(e) => handleChange('rejects', e.target.value)}
                    />
                    {errors.rejects && <span className="text-red text-sm">{errors.rejects[0]}</span>}
                </div>
                <div className='w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Purging <span>(kg)</span></p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1"
                        type='number'
                        name="purging"
                        placeholder="1"
                        value={inputValues.purging || ''}
                        onChange={(e) => handleChange('purging', e.target.value)}
                    />
                    {errors.purging && <span className="text-red text-sm">{errors.purging[0]}</span>}
                </div>
                <div className='w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Stoppage Time</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500"
                        type='datetime-local'
                        name="time"
                        placeholder="128965"
                        onChange={(e) => assignDateTime(e)}
                    />
                    {errors.time && <span className="text-red text-sm">{errors.time[0]}</span>}
                </div>
                <div className='w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Stoppage Reason</p>
                    {renderStoppageReasons()}
                    {errors.reason && <span className="text-red text-sm">{errors.reason[0]}</span>}
                </div>
            </form>
            <div className="w-full flex items-center justify-between">
                <button className="bg-red hover:bg-white hover:text-red border-2 hover:border-red border-white w-40 uppercase text-sm font-medium text-white p-2 rounded cursor-pointer ease-in-out duration-300 outline-none" onClick={onclose}>Cancel</button>
                <button className="bg-green hover:bg-white hover:text-green border-2 hover:border-green border-white w-40 uppercase text-sm font-medium text-white p-2 rounded cursor-pointer ease-in-out duration-300 outline-none" onClick={endRun}>{data?.isLoading ? 'Ending Run...' : 'End Run'}</button>
            </div>
        </div>
    )
}

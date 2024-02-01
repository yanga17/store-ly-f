'use client'

import axios from "axios";
import { useState } from "react";
import { Dropdown } from "@/shared";
import Validator from "validatorjs";
import { toast } from "react-hot-toast";
import { apiEndPoint } from "@/utils/colors";
import { wmmColours, wmmShifts } from "@/shared/tools/app-variables";
import { Managers, Operators, Products, useInputHandler } from "@/hooks";

const rules = {
    manager: 'required',
    operator: 'required',
    shift: 'required',
    product: 'required',
    color: 'required',
    cavity: 'required',
    reading: 'required',
    time: 'required',
};

interface Errors {
    [key: string]: string[];
}

interface StartRunProps {
    onclose: () => void;
    client: string,
    clientID: string
}

export const StartRun: React.FunctionComponent<StartRunProps> = ({ onclose, client, clientID }) => {
    const [data, setData] = useState({
        shift: null,
        cavity: null,
        reading: null,
        manager: null,
        operator: null,
        color: null,
        product: null,
        time: null,
        isLoading: false
    })

    const [errors, setErrors] = useState<Errors>({});

    const products = Products();
    const managers = Managers();
    const operators = Operators();

    const { handleChange, inputValues, clearValues } = useInputHandler();

    const assignDateTime = (e: any) => setData({ ...data, time: e.target.value?.replace('T', ' ') })

    const assignShift = (option: any) => setData({ ...data, shift: option?.name });

    const renderOperators = () => {
        const assignOperator = (option: any) => setData({ ...data, operator: option?.name });

        if (!operators) {
            return <div className="p-3 border w-full bg-grey-darker animate-pulse rounded h-[50px]" />
        }
        else {
            const availableOperators = operators?.map((property, index) => ({
                id: index,
                name: `${property.name} ${property.surname}`,
                photoURL: (property.profile_photo && property.profile_photo != null) ? property.profile_photo : 'userIcon'
            }))

            const data: any = availableOperators

            return <Dropdown options={data} onSelect={assignOperator} />
        }
    }

    const renderManagers = () => {
        const assignManager = (option: any) => setData({ ...data, manager: option?.name });

        if (!managers) {
            return <div className="p-3 border w-full bg-grey-darker animate-pulse rounded h-[50px]" />
        }
        else {
            const availableManagers = managers?.map((property, index) => ({
                id: index,
                name: `${property.name} ${property.surname}`,
                photoURL: (property.profile_photo && property.profile_photo != null) ? property.profile_photo : 'userIcon'
            }))

            const data: any = availableManagers

            return <Dropdown options={data} onSelect={assignManager} />
        }
    }

    const renderProducts = () => {
        const assignProduct = (option: any) => setData({ ...data, product: option?.name });

        if (!products) {
            return <div className="p-3 border w-full bg-grey-darker animate-pulse rounded h-[50px]" />
        }
        else {
            const availableProducts = products?.map((property) => ({
                id: property?.uid,
                name: property.product_name,
                photoURL: property.image ? `data:image/png;base64,${property.image}` : 'productIcon'
            }))

            const data: any = availableProducts

            return <Dropdown options={data} onSelect={assignProduct} />
        }
    }

    const renderColors = () => {
        const assignColor = (option: any) => setData({ ...data, color: option?.name });

        if (!wmmColours) {
            return <div className="p-3 border w-full bg-grey-darker animate-pulse rounded h-[50px]" />
        }
        else {
            const availableColors = wmmColours?.map((property, index) => ({
                id: index,
                name: property,
                photoURL: 'clear'
            }))

            const data: any = availableColors

            return <Dropdown options={data} onSelect={assignColor} />
        }
    }

    const endRun = async () => {
        const shiftData = {
            ...data,
            cavity: inputValues?.cavity,
            reading: inputValues?.reading,
        };

        const validateLogs = new Validator(shiftData, rules);

        if (validateLogs.fails()) {
            setErrors(validateLogs.errors.all());
            return;
        }

        if (validateLogs.passes()) {

            setErrors({})
            setData({ ...data, isLoading: true })

            const realtimeData = {
                team_leader: data?.manager,
                operator: data?.operator,
                shift: data?.shift,
                product_name: client,
                colour: data?.color,
                cavity: inputValues?.cavity,
                counter_reading_start: data?.reading,
                start_up_time: data?.time && data?.time,
                machine_number: clientID,
                machine_name: client
            }

            const shiftData = {
                team_leader: data?.manager,
                operator: data?.operator,
                shift: data?.shift,
                product_name: data?.product,
                colour: data?.color,
                cavity: inputValues?.cavity,
                counter_reading_start: data?.reading,
                start_up_time: data?.time && data?.time
            }

            try {
                const updateURL = `api/v1/machine/updateinjectiontemp`
                const response = await axios.put(`${apiEndPoint}/${updateURL}/${clientID}`, shiftData)

                if (response?.data?.message === 'Success') {

                    const insertURL = `api/v1/machine/insertinjection`
                    const response = await axios.post(`${apiEndPoint}/${insertURL}`, realtimeData)

                    if (response?.data?.message === 'Success') {
                        setData({ ...data, isLoading: false })

                        toast(`Shift started successfully`,
                            {
                                icon: '✅',
                                style: {
                                    borderRadius: '10px',
                                    background: '#333',
                                    color: '#fff',
                                },
                            }
                        );

                        onclose()
                        clearValues()
                    }
                }
            }
            catch (error) {
                console.log(error)
                setData({ ...data, isLoading: false })


                toast(`Failed to start shift, re-try again`,
                    {
                        icon: '✅',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }
        }
    }

    return (
        <div className="p-2">
            <form className='w-full p-2 flex items-start justify-start flex-wrap gap-y-4 gap-x-2 md:gap-x-4'>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Start Counter Reading</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1"
                        type='number'
                        name="reading"
                        placeholder="128965"
                        value={inputValues.reading || ''}
                        onChange={(e) => handleChange('reading', e.target.value)}
                    />
                    {errors.reading && <span className="text-red text-sm">{errors.reading[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Cavity</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1"
                        type='number'
                        name="cavity"
                        placeholder="1"
                        value={inputValues.cavity || ''}
                        onChange={(e) => handleChange('cavity', e.target.value)}
                    />
                    {errors.cavity && <span className="text-red text-sm">{errors.cavity[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Start Time</p>
                    <input
                        className="w-full placeholder:italic border p-[13px] cursor-pointer outline-none text-sm rounded text-gray-500 mt-1"
                        type='datetime-local'
                        name="time"
                        placeholder="128965"
                        onChange={(e) => assignDateTime(e)}
                    />
                    {errors.time && <span className="text-red text-sm">{errors.time[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <div className="relative flex flex-col justify-start items-start gap-1">
                        <p className='text-gray-500 font-medium text-sm '>Shift</p>
                        <Dropdown options={wmmShifts} onSelect={assignShift} />
                        {errors.shift && <span className="text-red text-sm">{errors.shift[0]}</span>}
                    </div>
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Colour</p>
                    {renderColors()}
                    {errors.color && <span className="text-red text-sm">{errors.color[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Team Leader</p>
                    {renderManagers()}
                    {errors.manager && <span className="text-red text-sm">{errors.manager[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Operator</p>
                    {renderOperators()}
                    {errors.operator && <span className="text-red text-sm">{errors.operator[0]}</span>}
                </div>
                <div className='w-[48%] lg:w-[24%]'>
                    <p className='text-gray-500 font-medium text-sm '>Product Name</p>
                    {renderProducts()}
                    {errors.product && <span className="text-red text-sm">{errors.product[0]}</span>}
                </div>
            </form>
            <div className="w-full flex items-center justify-between">
                <button className="bg-red hover:bg-white hover:text-red border-2 hover:border-red border-white w-40 uppercase text-sm font-medium text-white p-2 rounded cursor-pointer ease-in-out duration-300 outline-none" onClick={onclose}>Cancel</button>
                <button className="bg-green hover:bg-white hover:text-green border-2 hover:border-green border-white w-40 uppercase text-sm font-medium text-white p-2 rounded cursor-pointer ease-in-out duration-300 outline-none" onClick={endRun}>{data?.isLoading ? 'Starting Run...' : 'Start Run'}</button>
            </div>
        </div>
    )
}

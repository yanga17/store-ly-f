'use client'

import { isEmpty } from 'lodash';
import { useQuery } from "@/hooks/useQuery";
import { CheckCheck, X } from "lucide-react";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface CheckProps {
    uid: number,
    emp_id: string,
    emp_name: string,
    emp_surname: string,
    checkin_time: string,
    checkin_status: number,
    ischecked: number
}

type ResponseType = CheckProps[]

export const AttendanceModule = () => {

    const url = `checkin/getcheckins`;
    const { data, loading, error } = useQuery<ResponseType>(url);

    if (loading) {
        return (
            <>
                {
                    [...Array(500)].map((_, index) =>
                        <div key={index} className="flex items-center justify-between divide-x divide-gray-500 w-full bg-white text-black p-2 rounded">
                            <div className='w-1/4'>
                                <p className='bg-black-light animate-pulse py-4 w-11/12 mx-auto rounded'></p>
                            </div>
                            <div className='w-1/4'>
                                <p className='bg-black-light animate-pulse py-4 w-11/12 mx-auto rounded'></p>
                            </div>
                            <div className='w-1/4'>
                                <p className='bg-black-light animate-pulse py-4 w-11/12 mx-auto rounded'></p>
                            </div>
                            <div className="w-1/4 flex items-center justify-center gap-2">
                                <button
                                    disabled
                                    className="bg-green hover:bg-white hover:text-green border border-green ease-in-out duration-300 text-white cursor-pointer px-6 py-2 text-sm rounded uppercase font-medium flex items-center justify-center gap-1">
                                    <span>Confirm</span>
                                    <CheckCheck />
                                </button>
                                <button
                                    disabled
                                    className="bg-red hover:bg-white hover:text-red border border-red ease-in-out duration-300 text-white cursor-pointer px-6 py-2 text-sm rounded uppercase font-medium flex items-center justify-center gap-1">
                                    <span>Decline</span>
                                    <X />
                                </button>
                            </div>
                        </div>
                    )}
            </>
        )
    };

    if (error) {
        return (
            <>
                {
                    [...Array(500)].map((_, index) =>
                        <div key={index} className="flex items-center justify-between divide-x divide-gray-500 w-full bg-white text-black p-2 rounded">
                            <div className='w-1/4'>
                                <p className='bg-black-light animate-pulse py-4 w-11/12 mx-auto rounded'></p>
                            </div>
                            <div className='w-1/4'>
                                <p className='bg-black-light animate-pulse py-4 w-11/12 mx-auto rounded'></p>
                            </div>
                            <div className='w-1/4'>
                                <p className='bg-black-light animate-pulse py-4 w-11/12 mx-auto rounded'></p>
                            </div>
                            <div className="w-1/4 flex items-center justify-center gap-2">
                                <button
                                    disabled
                                    className="bg-green hover:bg-white hover:text-green border border-green ease-in-out duration-300 text-white cursor-pointer px-6 py-2 text-sm rounded uppercase font-medium flex items-center justify-center gap-1">
                                    <span>Confirm</span>
                                    <CheckCheck />
                                </button>
                                <button
                                    disabled
                                    className="bg-red hover:bg-white hover:text-red border border-red ease-in-out duration-300 text-white cursor-pointer px-6 py-2 text-sm rounded uppercase font-medium flex items-center justify-center gap-1">
                                    <span>Decline</span>
                                    <X />
                                </button>
                            </div>
                        </div>
                    )}
            </>
        )
    };

    if (!data && !isEmpty(data)) {
        return (
            <>
                {
                    [...Array(500)].map((_, index) =>
                        <div key={index} className="flex items-center justify-between divide-x divide-gray-500 w-full bg-white text-black p-2 rounded">
                            <div className='w-1/4'>
                                <p className='bg-black-light animate-pulse py-4 w-11/12 mx-auto rounded'></p>
                            </div>
                            <div className='w-1/4'>
                                <p className='bg-black-light animate-pulse py-4 w-11/12 mx-auto rounded'></p>
                            </div>
                            <div className='w-1/4'>
                                <p className='bg-black-light animate-pulse py-4 w-11/12 mx-auto rounded'></p>
                            </div>
                            <div className="w-1/4 flex items-center justify-center gap-2">
                                <button
                                    disabled
                                    className="bg-green hover:bg-white hover:text-green border border-green ease-in-out duration-300 text-white cursor-pointer px-6 py-2 text-sm rounded uppercase font-medium flex items-center justify-center gap-1">
                                    <span>Confirm</span>
                                    <CheckCheck />
                                </button>
                                <button
                                    disabled
                                    className="bg-red hover:bg-white hover:text-red border border-red ease-in-out duration-300 text-white cursor-pointer px-6 py-2 text-sm rounded uppercase font-medium flex items-center justify-center gap-1">
                                    <span>Decline</span>
                                    <X />
                                </button>
                            </div>
                        </div>
                    )}
            </>
        )
    };

    const checkInLog = data?.map((property) => ({
        uid: property?.uid,
        userName: property.emp_name,
        userSurname: property.emp_surname,
        checkInTime: property.checkin_time?.slice(0, 19)?.replace('T', ' '),
        status: property.ischecked
    }))

    const resolveAttendee = async (data: { action: number, uid: number }) => {
        if (!data) {
            return;
        }

        const { action, uid } = data

        try {
            const actionsURL = `checkin/updatecheckin`
            const response = await axios.put(`${apiEndPoint}/${actionsURL}/${action}/${uid}`)

            if (response?.data?.message === 'Success') {
                toast(`Attendee status resolved successfully`,
                    {
                        icon: '👋',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }
            else { }
        }
        catch (error) {
            //handle errors
            console.log(error)
        }
    }

    return (
        <>
            {
                checkInLog?.map(({ uid, userName, userSurname, checkInTime, status }) =>
                    <div key={uid} className="flex items-center justify-between divide-x divide-gray-500 w-full bg-white text-black p-2 rounded overflow-hidden">
                        <p className={`text-sm uppercase text-gray-500 font-medium w-1/4 text-center`}>{userName}</p>
                        <p className={`text-sm uppercase text-gray-500 font-medium w-1/4 text-center`}>{userSurname}</p>
                        <p className={`text-sm uppercase text-gray-500 font-medium w-1/4 text-center`}>{checkInTime}</p>
                        <div className="w-1/4 flex items-center justify-center gap-2">
                            {status === 0 ?
                                <>
                                    <button className="bg-green hover:bg-white hover:text-green border border-green ease-in-out duration-300 text-white cursor-pointer px-6 py-2 text-sm rounded uppercase font-medium flex items-center justify-center gap-1"
                                        onClick={() => resolveAttendee({ action: 1, uid })}>
                                        <span>Confirm</span>
                                        <CheckCheck />
                                    </button>
                                    <button className="bg-red hover:bg-white hover:text-red border border-red ease-in-out duration-300 text-white cursor-pointer px-6 py-2 text-sm rounded uppercase font-medium flex items-center justify-center gap-1"
                                        onClick={() => resolveAttendee({ action: 0, uid })}>
                                        <span>Decline</span>
                                        <X />
                                    </button>
                                </>
                                :
                                <CheckCheck size={30} color={colors?.green} />
                            }
                        </div>
                    </div>
                )}
        </>
    )
}

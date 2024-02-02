'use client'

import axios from "axios";
import { Managers, Operators } from "@/hooks";
import { Dropdown } from "@/shared";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { apiEndPoint } from "@/utils/colors";

export const AssignManagerModule = () => {
    const managers = Managers();
    const [data, setData] = useState({
        isLoading: false,
        manager: null,
    });

    const shiftName = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        // Define the time ranges for Day and Night
        const nightStart = 18; // 6:00 PM
        const nightEnd = 6;    // 6:00 AM

        if (currentHour >= nightStart || currentHour < nightEnd) {
            return "Night";
        } else {
            return "Day";
        }
    }

    const renderOperators = () => {
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

    const assignManager = async () => {

        const payLoad = {
            team_leader: data?.manager,
            shift: shiftName()
        }

        try {
            const url = `api/v1/machine/updatemanager`
            const response = await axios.put(`${apiEndPoint}/${url}`, payLoad)

            if (response?.data?.message === "Success") {
                toast(`${data?.manager} assigned to ${shiftName()} shift`,
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
            }
            else {
                toast(`Failed to assign ${data?.manager} to todays ${shiftName()} shift, please refresh`,
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
        catch (error) {
            toast(`Failed to assign ${data?.manager} to todays ${shiftName()} shift, please retry`,
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

    useEffect(() => {
        if (data?.manager) {
            assignManager()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.manager])

    return (
        <div className="w-11/12 mx-auto">
            {renderOperators()}
        </div>
    )
}

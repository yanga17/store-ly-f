'use client'

import axios from "axios";
import { Operators } from "@/hooks";
import { Dropdown } from "@/shared";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { apiEndPoint } from "@/utils/colors";

interface StartRunProps {
    clientID: string,
    operator: string,
}

export const AssignOperatorModule: React.FunctionComponent<StartRunProps> = ({ clientID, operator }) => {
    const operators = Operators();
    const [data, setData] = useState({
        isLoading: false,
        operator: null,
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

    const assignOperator = async () => {

        const payLoad = {
            machine_number: clientID,
            operator: data?.operator,
        }

        try {
            const url = `api/v1/machine/updateoperator`
            const response = await axios.put(`${apiEndPoint}/${url}`, payLoad)

            if (response?.data?.message === "Success") {
                toast(`${data?.operator} assigned to machine ${clientID}, ${shiftName()} shift`,
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
                toast(`Failed to assign ${data?.operator} to todays ${shiftName()} shift, please refresh`,
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
            toast(`Failed to assign ${data?.operator} to todays ${shiftName()} shift, please retry`,
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
        if (data?.operator) {
            assignOperator()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.operator])

    return (
        <div className="w-11/12 mx-auto">
            {renderOperators()}
        </div>
    )
}

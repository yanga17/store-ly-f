'use client'

import axios from "axios";
import moment from 'moment';
import { useSession } from "@/context";
import { toast } from 'react-hot-toast';
import { apiEndPoint } from "@/utils/colors";
import { useAudit } from "@/shared/tools/auditMonit";

export default function Checkin() {
    const { user } = useSession();
    const { addAuditLog } = useAudit();

    if (!user) {
        return;
    }

    const { emp_id, emp_name, emp_surname } = user

    const checkinUser = async () => {

        const payLoad = {
            emp_id: emp_id,
            emp_name: emp_name,
            emp_surname: emp_surname,
            checkin_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        }

        try {
            addAuditLog({ action: `checkin attempt` })
            const url = `checkin/insertcheckin`;
            const response = await axios.post(`${apiEndPoint}/${url}`, payLoad)

            if (response?.data?.message === "Success") {
                addAuditLog({ action: `checkin success` })
                toast(`Checked in successfully!`,
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
            else {
                addAuditLog({ action: `checkin failed: Error - ${response?.data}` })
                toast(`Failed to checkin`,
                    {
                        icon: '❌',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }
        }
        catch (error: any) {
            addAuditLog({ action: `checkin failed: Error - ${error?.message}` })
            toast(`Failed to checkin`,
                {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }

    }

    return (
        <section className="w-full h-full flex flex-col items-center justify-center gap-2 bg-black">
            <button className="bg-green text-white px-10 py-4 lg:py-10 rounded uppercase" onClick={checkinUser}>Check In Now</button>
        </section>
    );
}
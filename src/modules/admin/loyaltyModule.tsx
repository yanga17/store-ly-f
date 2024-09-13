'use client'

import { isEmpty } from 'lodash';
import { useQuery } from "@/hooks/useQuery";
import { Check, CheckCheck, X, Pyramid } from "lucide-react";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAudit } from '@/shared/tools/auditMonit';
import MultiColorLoader from '@/lib/loaders';
import Image from 'next/image';


export const LoyaltyModule = () => {


    return (
        <div className='w-full h-screen flex flex-col px-4 py-4 gap-4 rounded-lg overflow-y-auto m2b-4'>
            <h1>Loyalty Module</h1>
        </div>
    );
}

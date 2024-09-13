'use client'

import axios from 'axios';
import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import { toast } from 'react-hot-toast';
import MultiColorLoader from '@/lib/loaders';
import Image from 'next/image';
import { LoyaltyModule } from './loyaltyModule';
import { ProductsManModule } from './productsManModule';
import { useState, useEffect } from 'react';


export const AdminModule = () => {
    const [currentTab, setCurrentTab] = useState('products');


    return (
        <div className='w-full h-screen flex flex-col px-4 py-4 gap-4 rounded-lg overflow-y-auto m2b-4'>
            <div className='w-full p-2 sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center'>
                <button onClick={() => setCurrentTab('products')} className='bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none'>Product Management</button>
                <button onClick={() => setCurrentTab('loyalty')} className='bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none'>Loyalty Management</button>
            </div>
            {currentTab === 'loyalty' && <LoyaltyModule />}
            {currentTab === 'products' && <ProductsManModule />}
        </div>
    );
}

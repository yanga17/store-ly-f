'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { isEmpty } from 'lodash';
import { useQuery } from "@/hooks/useQuery";
import { Check, CheckCheck, X, Pyramid } from "lucide-react";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAudit } from '@/shared/tools/auditMonit';
import MultiColorLoader from '@/lib/loaders';
import Image from 'next/image';

interface ProductProps {
    idx: number,
    Stockcode: number,
    Product_Description: string,
    Category: string,
    DepNum: number,
    SubNum: number,
    Soh: number,
    VarPrc: number,
    VatPerc: number,
    Discount: number,
    ExclCost: number,
    Markup: number,
    GPPerc: number,
    ExclSell: number,
    ExclSell2: number,
    ExclSell3: number,
    Markup2: number,
    GPPerc2: number,
    Markup3: number,
    GPPerc3: number,
    IncSell: number,
    IncSell2: number,
    ROS: number,
    Discount_Expiry: null,
    Client_ID: number,
    Product_Image: Buffer
}

type ProductResponse = ProductProps[]

export const ProductsModule = () => {

    const { addAuditLog } = useAudit()

    const url = `products/getproducts`;
    const { data, loading, error } = useQuery<ProductResponse>(url);

    if (loading) {
        return (
            <MultiColorLoader />
        )
    }

    if (error) {
        return (
            <div>AN ERROR OCCURED!!</div>
        )
    }

    console.log('my products data returned:', data)

    return (
        <div className='w-full h-screen flex flex-col gap-4 bg-white rounded-lg overflow-y-auto mb-4'>
            <div className='flex justify-between'>
                <input
                    className="p-2 w-full border rounded-full outline-none md:cursor-pointer placeholder:text-sm placeholder:italic"
                    placeholder="Search Products"
                    style={{ width: "440px" }}
                />
                <div className='pr-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Categories</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Burgers</DropdownMenuItem>
                            <DropdownMenuItem>Chips</DropdownMenuItem>
                            <DropdownMenuItem>Sausages</DropdownMenuItem>
                            <DropdownMenuItem>Salad</DropdownMenuItem>
                            <DropdownMenuItem>Rolls</DropdownMenuItem>
                            <DropdownMenuItem>Sandwiches</DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
            
            {data && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                    {data.map(({ idx, Stockcode, Product_Description, Category, DepNum, SubNum, Soh, VarPrc, VatPerc, Discount, ExclCost, Markup, GPPerc, ExclSell, ExclSell2, ExclSell3, Markup2, GPPerc2, Markup3, GPPerc3, IncSell, IncSell2, ROS, Discount_Expiry, Client_ID, Product_Image }) => (
                        <div key={idx} className='border-2 border-gray-300 h-64 w-full rounded-lg flex flex-col'>
                            <div className='flex justify-end py-2 px-2 cursor-pointer'>
                                <Pyramid size={20} color='orange'/>
                            </div>
                            <div className='flex-grow flex items-center justify-center'>
                                <Image 
                                    src="/covers/food.png"
                                    alt="FoodPlaceholder"
                                    width={150}
                                    height={100}
                                    objectFit="contain"
                                />
                            </div>
                            <div className='p-2'>
                                <p className='font-bold'>R{IncSell}</p>
                                {Discount > 0 && <p className='text-xs text-gray-500'>with discount</p>}
                                <p className='text-xs text-gray-500 break-words whitespace-normal mt-1'>{Product_Description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

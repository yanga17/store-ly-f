'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useQuery } from "@/hooks/useQuery";
import { Check, CheckCheck, X, Pyramid } from "lucide-react";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { toast } from 'react-hot-toast';
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
    Discount_Expiry: string,
    Client_ID: number,
    Product_Image: Buffer
}

type ProductResponse = ProductProps[]

export const ProductsModule = () => {

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
         // Added 'pb-20' to create spacing between the product cards and the bottom of the screen
         <div className='w-full h-screen flex flex-col bg-white rounded-lg overflow-y-hidden mb-4 pb-24'>
         <div className='flex justify-between p-4'>
             <input
                 className="p-2 w-full border rounded-full outline-none md:cursor-pointer placeholder:text-sm placeholder:italic"
                 placeholder="Search Products"
                 style={{ width: "440px" }}
             />
             <div className="pr-2 pt-2">
             <DropdownMenu>
                 <DropdownMenuTrigger className="w-20 bg-black rounded text-white py-2 hover:bg-red">Open</DropdownMenuTrigger>
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
             // Modified 'flex-grow' and 'overflow-y-auto' to ensure proper scrolling and spacing
             <div className='flex-grow overflow-y-auto'>
                 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4'>
                     {data.map(({ idx, Product_Description, IncSell, Discount, Discount_Expiry, VatPerc, Product_Image }) => (
                         <div key={idx} className='border-2 border-gray-300 h-64 w-full rounded-lg flex flex-col'>
                         {/* Conditionally render the Pyramid icon if VatPerc exists */}
                         {VatPerc === 0 || VatPerc === undefined ? (
                                    <div className='flex justify-end py-2 px-2 cursor-pointer'>
                                        <Pyramid size={20} color='orange' />
                                    </div>
                            ) : null}
                         
                         {/* Added a wrapper around the image with 'overflow-hidden' to prevent image overflow */}
                         <div className='w-full h-32 flex items-center justify-center overflow-hidden'>
                             <Image 
                                 // Conditional rendering for the image source
                                 src={Product_Image ? `data:image/jpeg;base64,${Buffer.from(Product_Image).toString('base64')}` : "/covers/food.png"}
                                 alt={Product_Description || "FoodPlaceholder"}
                     
                                 // Fixed width and height to maintain consistent image size
                                 width={120}  // Adjusted image width
                                 height={120} // Adjusted image height
                     
                                 // Ensure the image fits inside the container without distorting
                                 objectFit="contain"
                             />
                         </div>
                     
                         {/* Added 'flex-grow' here to ensure the text content fills the remaining space */}
                         <div className='p-2 flex-grow'>
                             <p className='font-bold'>R{IncSell}</p>
                             {Discount > 0 && <p className='text-xs text-gray-500'>with discount</p>}
                             {/* Wrapped the product description to prevent overflow and ensure proper spacing */}
                             <p className='text-xs text-gray-500 break-words whitespace-normal mt-1'>{Product_Description}</p>
                         </div>
                     
                         {/* Conditionally render the Discount_Expiry section based on its value */}
                         {Discount_Expiry ? (
                                    <div className="py-2 px-2 border-t border-gray-300">
                                        <div className="bg-amber-400 w-full flex justify-between rounded p-1">
                                            <p className="text-white text-xs">Special</p>
                                            <p className="text-white text-xs">Buy 2 for R100</p>
                                        </div>
                                    </div>
                            ) : (
                                    // Render this section if Discount_Expiry is not available
                                    <div className="py-2 px-2 border-t border-gray-300">
                                        <div className="bg-rose-400 w-full h-full flex justify-center rounded p-1">
                                            <p className="text-white text-xs">No Special</p>
                                        </div>
                                    </div>
                            )}
                     </div>
                     ))}
                 </div>
             </div>
         )}
     </div>
    );
}

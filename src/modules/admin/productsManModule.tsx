'use client'

import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import MultiColorLoader from '@/lib/loaders';
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import toast from 'react-hot-toast';
import { XIcon, Check, Percent, Gem } from "lucide-react";

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
    Special: string,
    Special_ExpiryDate: string,
    Client_ID: number,
    Product_Image: Buffer
}

type ProductResponse = ProductProps[]


export const ProductsManModule = () => {
    const [productDescription, setProductDescription] = useState('');
    const [discount, setDiscount] = useState('');
    const [discountExpiry, setDiscountExpiry] = useState('');

    const [special, setSpecial] = useState('');
    const [specialExpiry, setSpecialExpiry] = useState('');

    const [selectedDisidx, setSelectedDisidx] = useState<number | null>(null); // Track selected product index
    const [selectedSpecidx, setSelectedSpecidx] = useState<number | null>(null); // Track selected product index


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

    // 2. Updated function to use selectedIdx, which is the index of the selected product
    const setProductDiscount = async (idx: any) => {
        if (selectedDisidx === null) return; // Check if idx is selected
        const newDiscountExp = new Date(discountExpiry);
        console.log("selected product discount index:", selectedDisidx);

        try {
            const url = `products/setproductdisc/${discount}/${newDiscountExp}/${selectedDisidx}`;
            const response = await axios.patch<ProductResponse>(`${apiEndPoint}/${url}`);
            console.log("The Products Discount has been set successfully", response)

            toast.success('The product discount has been set.', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });

        } catch (error) {
            console.log("AN error occured when setting the product discount")

            toast.error('There was an error setting the product discount', {
                icon: <XIcon color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    // 3. Updated function to use selectedIdx, similar to the discount function above
    const setProductSpecial = async (idx: any) => {
        if (selectedSpecidx === null) return; // Check if idx is selected
        const newSpecialExp = new Date(specialExpiry);
        console.log("selected product special index:", selectedSpecidx);

        try {
            const url = `products/setproductspecial/${special}/${newSpecialExp}/${selectedSpecidx}`;
            const response = await axios.patch<ProductResponse>(`${apiEndPoint}/${url}`);
            console.log("The Products Discount has been set successfully", response)

            toast.success('The product special has been set.', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });

        } catch (error) {
            console.log("An error occured when setting the product discount")

            toast.error('There was an error setting the product special', {
                icon: <XIcon color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }


    return (
        <div className='w-full h-screen overflow-y-auto mb-4 pr-4'>
            <div className='overflow-y-auto'>
                <div className='bg-white rounded-lg p-4'>
                    <h3>Products Management</h3>
                    <p className='text-gray-500'>Manage your products and categories here. Set discounts and manage specials</p>
                    <div className='flex gap-4 pt-6'>
                        <div className='w-full'>
                            <label>Product</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <select 
                                        className="w-full p-2 rounded-lg border border-gray-300 cursor-pointer"
                                        onChange={(e) => {
                                            const selectedProduct = data?.find(product => product.Product_Description === e.target.value);
                                            if (selectedProduct) {
                                                setDiscount(e.target.value);
                                                setSelectedDisidx(selectedProduct.idx); // Update selected product index
                                            }
                                        }}
                                    >
                                        <option className="">Select Product</option>
                                        {data?.map(({ idx, Product_Description }) =>
                                            <option key={idx} value={Product_Description}>{Product_Description}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label>Discount (%)</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input onChange={(e) => setDiscount(e.target.value)} type="text" placeholder='5%' className='w-full p-2 rounded-lg border border-gray-300 cursor-pointer' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label>Discount Expiry</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                <input 
                                    type="date" 
                                    className='w-full p-2 rounded-lg border border-gray-300 cursor-pointer'
                                    onChange={(e) => setDiscountExpiry(e.target.value)}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4 pt-6'>
                        <div className='w-full'>
                            <label>Product</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <select 
                                        className="w-full p-2 rounded-lg border border-gray-300 cursor-pointer"
                                        onChange={(e) => {
                                            const selectedProduct = data?.find(product => product.Product_Description === e.target.value);
                                            if (selectedProduct) {
                                                setSpecial(e.target.value);
                                                setSelectedSpecidx(selectedProduct.idx); // Update selected product index
                                            }
                                        }}
                                    >
                                        <option className="dash-text">Select Product</option>
                                        {data?.map(({ idx, Product_Description }) =>
                                            <option key={idx} value={Product_Description}>{Product_Description}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label>Special</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input onChange={(e) => setSpecial(e.target.value)} type="text" placeholder='buy 2 get 50% off next purchase' className='w-full p-2 rounded-lg border border-gray-300 cursor-pointer' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label>Special Expiry</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input
                                        type="date" 
                                        className='w-full p-2 rounded-lg border border-gray-300 cursor-pointer'
                                        onChange={(e) => setSpecialExpiry(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 pt-4'>
                        <button onClick={() => setProductDiscount } className='bg-black text-white p-2 w-40 rounded-lg hover:bg-red'>
                            Add Discount
                        </button>
                        <button onClick={() => setProductSpecial } className='bg-black text-white p-2 w-40 rounded-lg hover:bg-red'>
                            Add Special
                        </button>
                    </div>
                </div>
                <div className='pt-4 pb-24'>
                    <div className='bg-white rounded-lg p-4 pt-4'>
                        <h3>Edit Products Discounts/Specials</h3>
                        <p className='text-gray-500'>Manage your products and categories here. Add new products, set discounts and manage specials</p>
                        
                        <div className='pt-6'>
                            <table className='w-full table-fixed p-4'>
                                <thead className='table-headerup'>
                                    <tr className='bg-gray text-left h-10 p-2 text-md sm:text-sm md:text-md font-medium border-rounded rounded-full'>
                                        <th className='p-2 w-[30px]'>ID</th>
                                        <th className='p-2 w-[180px]'>Name</th>
                                        <th className='p-2 w-[100px]'>Category</th>
                                        <th className='p-2 w-[70px]'>Discount</th>
                                        <th className='p-2 w-[120px]'>Discount Expiry</th>
                                        <th className='p-2 w-[100px]'>Special</th>
                                        <th className='p-2 w-[120px]'>Special Expiry</th>
                                        <th className='p-2 w-[60px]'>Action</th>
                                    </tr>
                                </thead>
                                {data?.map(product => (
                                    <tbody key={product.idx} className="mb-4">
                                        <tr className='border-b'>
                                            <td className='p-2'>{product.idx}</td>
                                            <td className='p-2'>{product.Product_Description}</td>
                                            <td className='p-2'>{product.Category}</td>
                                            <td className='p-2'>{product.VatPerc}%</td>
                                            <td className='p-2'>
                                                {product.Discount_Expiry ? `${new Date(product.Discount_Expiry).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'}
                                            </td>
                                            <td className='p-2'>{product.Special || '--:--'}</td>
                                            <td className='p-2'>
                                                {product.Special_ExpiryDate ? `${new Date(product.Special_ExpiryDate).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'}
                                            </td>
                                            <td className='flex gap-2 py-2 px-2'>
                                                <button className='bg-black text-white p-3 w-20 rounded-lg hover:bg-red'>
                                                    <Percent size={22} />
                                                </button>
                                                <button className='bg-black text-white p-3 w-20 rounded-lg hover:bg-red'>
                                                    <Gem size={22} />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

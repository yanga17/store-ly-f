'use client'

import { isEmpty } from 'lodash';
import { useQuery } from "@/hooks/useQuery";
import { Check, CheckCheck, X, Pyramid } from "lucide-react";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import MultiColorLoader from '@/lib/loaders';
import Image from 'next/image';
import { useState, useEffect } from 'react'


export const ProductsManModule = () => {
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stockcode, setStockCode] = useState(0)
    const [soh, setSoh] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [expiryDate, setExpiryDate] = useState<Date | null>(null);
    const [exclCost, setExclCost] = useState(0);
    const [exclPrice, setExclPrice] = useState(0);
    const [inclPrice, setInclPrice] = useState(0);


    //http://localhost:4200/products/addproduct
    const addNewProduct = () => {
        try{

            const payload = {
                productDescription: productDescription,
                category: category,
                stockcode: stockcode,
                soh: soh,
                discount: discount,
                discountExpiry: expiryDate,
                exclCost: exclCost,
                exclSell: exclPrice,
                incSell: inclPrice
            }

            const url = 'products/addproduct';
            const response = axios.post(`${apiEndPoint}/products/addproduct`, payload);
            console.log("The New Product has been added to the database:", response);

        } catch (error) {
            console.log("An Error was encountered when adding a new product")
        }
    }



    return (
        <div className='w-full h-screen overflow-y-auto mb-4'>
            <div className='overflow-y-auto'>
                <div className='bg-white rounded-lg p-4'>
                    <h3>Products Management</h3>
                    <p className='text-gray-500'>Manage your products and categories here. Add new products, set discounts and manage specials</p>

                    <div className='flex gap-4 pt-6'>
                        <div className='w-full'>
                            <label>Product</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input onChange={(e) => setProductDescription(e.target.value)} type="text" placeholder='Switch 440ML' className='w-full p-2 rounded-lg border border-gray-300' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label>Category</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input onChange={(e) => setCategory(e.target.value)} type="text" placeholder='Drinks' className='w-full p-2 rounded-lg border border-gray-300' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4 pt-6'>
                        <div className='w-full'>
                            <label>Stockcode</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input onChange={(e) => setStockCode(parseInt(e.target.value))} type="text" placeholder='17840274893' className='w-full p-2 rounded-lg border border-gray-300' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label>Stock on Hand</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input onChange={(e) => setSoh(parseInt(e.target.value))} type="text" placeholder='100' className='w-full p-2 rounded-lg border border-gray-300' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4 pt-6'>
                        <div className='w-full'>
                            <label>Discount (%)</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input onChange={(e) => setDiscount(parseInt(e.target.value))} type="text" placeholder='5%' className='w-full p-2 rounded-lg border border-gray-300' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label>Discount Expiry Date</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                <input 
                                    onChange={(e) => setExpiryDate(e.target.value ? new Date(e.target.value) : null)} 
                                    type="date" 
                                    className='w-full p-2 rounded-lg border border-gray-300' 
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4 pt-6'>
                        <div className='w-full'>
                            <label>Excl Cost</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input onChange={(e) => setDiscount(parseInt(e.target.value))} type="text" placeholder='10.99' className='w-full p-2 rounded-lg border border-gray-300' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label>Excl Price</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input onChange={(e) => setDiscount(parseInt(e.target.value))} type="text" placeholder='12.99' className='w-full p-2 rounded-lg border border-gray-300' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4 pt-6'>
                        <div className='w-fulls'>
                            <label>Incl Price</label>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-2'>
                                    <input onChange={(e) => setDiscount(parseInt(e.target.value))} type="text" placeholder='15.99' className='w-full p-2 rounded-lg border border-gray-300' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pt-4'>
                        <button onClick={ addNewProduct } className='bg-black text-white p-2 w-40 rounded-lg hover:bg-red'>
                            Add Product
                        </button>
                    </div>
                </div>
                <div className='pt-4'>
                    <div className='bg-white rounded-lg p-4 pt-4'>
                        <h3>Products List</h3>
                        <p className='text-gray-500'>Manage your products and categories here. Add new products, set discounts and manage specials</p>
                    
                        <div className='pt-6'>
                            <table className='w-full table-fixed p-4'>
                                <thead className='table-headerup'>
                                    <tr className='bg-gray text-left h-10 p-2 text-md sm:text-sm md:text-md font-medium border-rounded rounded-full'>
                                        <th className='p-2 w-[80px]'>Name</th>
                                        <th className='p-2 w-[180px]'>Category</th>
                                        <th className='p-2 w-[100px]'>Discount</th>
                                        <th className='p-2 w-[140px]'>Expiry Date</th>
                                        <th className='p-2 w-[60px]'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="mb-4">
                                    <tr className='border-b'>
                                        <td className='p-2'>Cheese Burger</td>
                                        <td className='p-2'>Burgers</td>
                                        <td className='p-2'>5%</td>
                                        <td className='p-2'>Wed Sep 11 2024 12:41:24</td>
                                        <div className='py-2 px-2'>
                                            <button className='bg-black text-white p-2 w-20 rounded-lg hover:bg-red'>
                                                Edit
                                            </button>
                                        </div>
                                    </tr>
                                    <tr className='border-b'>
                                        <td className='p-2'>Chilli Russian	Sausages</td>
                                        <td className='p-2'>Sausages</td>
                                        <td className='p-2'>10%</td>
                                        <td className='p-2'>Wed Sep 11 2024 12:41:24</td>
                                        <div className='py-2 px-2'>
                                            <button className='bg-black text-white p-2 w-20 rounded-lg hover:bg-red'>
                                                Edit
                                            </button>
                                        </div>
                                    </tr>
                                    <tr className='border-b'>
                                        <td className='p-2'>Russian Roll</td>
                                        <td className='p-2'>Rolls</td>
                                        <td className='p-2'>5%</td>
                                        <td className='p-2'>Wed Sep 11 2024 12:41:24</td>
                                        <div className='py-2 px-2'>
                                            <button className='bg-black text-white p-2 w-20 rounded-lg hover:bg-red'>
                                                Edit
                                            </button>
                                        </div>
                                    </tr>
                                    <tr className='border-b'>
                                        <td className='p-2'>Ham, Egg & Cheese</td>
                                        <td className='p-2'>Sandwiches</td>
                                        <td className='p-2'>5%</td>
                                        <td className='p-2'>Wed Sep 11 2024 12:41:24</td>
                                        <div className='py-2 px-2'>
                                            <button className='bg-black text-white p-2 w-20 rounded-lg hover:bg-red'>
                                                Edit
                                            </button>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

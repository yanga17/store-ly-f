'use client'

import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import MultiColorLoader from '@/lib/loaders';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export const LoyaltyModule = () => {

    const url = `products/getproducts`;
    const { data, loading, error } = useQuery<ProductResponse>(url);
    


    return (
        <div className='w-full h-screen flex flex-col px-4 py-4 gap-4 rounded-lg overflow-y-auto m2b-4'>
            <h4>Loyalty Module</h4>
            <div className="flex justify-between pt-4">
                <div className='bg-white w-[750px] rounded-lg p-4'>
                    <h3>Discounts</h3>
                    <p className='text-gray-500'>Reward customers with discounts for completing actions.</p>
                    <div className='w-full flex justify-start gap-4 pt-8'>
                        <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                            <Percent />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold">Signing up for the loyalty program</p>
                            <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full flex justify-start gap-4 pt-8'>
                            <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                <Percent />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">Signing up for the loyalty program</p>
                                <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full flex justify-start gap-4 pt-8'>
                            <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                <Percent />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">Signing up for the loyalty program</p>
                                <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full flex justify-start gap-4 pt-8'>
                            <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                <Percent />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">Signing up for the loyalty program</p>
                                <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 pt-4'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-black text-white p-2 w-40 rounded-lg hover:bg-red">Add Discount</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Name
                                </Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                Username
                                </Label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                            </div>
                            </div>
                            <DialogFooter>
                            <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    </div>
                </div>
                <div className='bg-white w-[780px] rounded-lg p-4'>
                    <h3>Specials</h3>
                    <p className='text-gray-500'>Reward customers with specials for completing actions.</p>
                    <div className='w-full flex justify-start gap-4 pt-8'>
                        <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                            <Gem />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold">Signing up for the loyalty program</p>
                            <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full flex justify-start gap-4 pt-8'>
                            <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                <Gem />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">Signing up for the loyalty program</p>
                                <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full flex justify-start gap-4 pt-8'>
                            <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                <Gem />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">Signing up for the loyalty program</p>
                                <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-full flex justify-start gap-4 pt-8'>
                            <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                <Gem />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">Signing up for the loyalty program</p>
                                <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 pt-4'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-black text-white p-2 w-40 rounded-lg hover:bg-red">Add Special</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Add New Special</DialogTitle>
                            <DialogDescription>
                                Select the product and determine the special for the products. Click save when you're done.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="flex gap-4">
                                <Label htmlFor="name" className="text-right pt-4">
                                    Product
                                </Label>
                                <select className="w-full p-2 rounded-lg border border-gray-300"
                                    >
                                        <option value="" className="dash-text">Select Product</option>
                                        {data?.map(({ idx, Product_Description }) =>
                                            <option key={idx} value={Product_Description}>{Product_Description}</option>
                                        )}
                                    </select>
                            </div>
                            <div className="flex gap-4">
                                <Label htmlFor="username" className="text-right pt-4">
                                    Special
                                </Label>
                                <input type="date" className='w-full p-2 rounded-lg border border-gray-300'/>
                            </div>
                            </div>
                            <DialogFooter>
                                <button className="bg-black text-white p-2 w-40 rounded-lg hover:bg-red">
                                    Save
                                </button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}

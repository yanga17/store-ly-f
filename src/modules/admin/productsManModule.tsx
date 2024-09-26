'use client'

import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import MultiColorLoader from '@/lib/loaders';
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import toast from 'react-hot-toast';
import { XIcon, Check, Percent, Gem, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


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

//setProductDiscountProps
interface DiscountProps {
    DiscountID: number,
    ProductID: number,
    DiscountName: string,
    StartDate: string,
    EndDate: string,
    DiscountType: string,
    DiscountValue: number,
    DiscountTier: string,
    MinimumSpending: number,
    UsageCount: number
}
type DiscountResponse = DiscountProps[]

//setProductDiscountProps
interface SpecialProps {
    productID: number,
    productCategory: string,
    special: string,
    specialType: string,
    startDate: string,
    expiryDate: string
}
type SpecialResponse = SpecialProps[]


//getAllProductsOnSpecial
interface GetSpecialsProps {
    ProductID: number,
    SpecialName: string,
    SpecialValue: number,
    StartDate: string,
    ExpiryDate: string,
    IsActive: number,
    ProductName: string,
    Price: number
}
type GetSpecialsResponse = GetSpecialsProps[]


//getAllProductsOnDiscounts
interface GetDiscountsProps {
    ProductID: number,
    DiscountName: string,
    StartDate: string,
    EndDate: string,
    DiscountValue: number,
    DiscountTier: string,
    ProductName: string,
    Price: number
}
type GetDiscountsResponse = GetDiscountsProps[]


export const ProductsManModule = () => {
    const [discountIdx, setDiscountProductIdx] = useState<number | null>(null); // Store product idx for discount
    const [discountName, setDiscountName] = useState('');
    const [discountValue, setDiscountValue] = useState(0);
    const [discountTier, setDiscountTier] = useState('');
    const [discountStartDate, setDiscountStartDate] = useState('');
    const [discountExpDate, setDiscountExpDate] = useState(''); 
    const [allDiscountedProducts, setProductDiscounts] = useState<GetDiscountsResponse>([]);

    const [specialId, setSpecialProductId] = useState<number | null>(null); // Store product idx for special
    const [special, setSpecial] = useState('');
    const [specialProdCategory, setSpecialProdCategory] = useState('');
    const [specialType, setSpecialType] = useState('');
    const [specialValue, setSpecialValue] = useState(0);
    const [specialStartDate, setSpecialStartDate] = useState('');
    const [specialExpDate, setSpecialExpDate] = useState('');
    const [allSpecialProducts, setProductSpecials] = useState<GetSpecialsResponse>([]);

    const discountOptions = [
        {discount: 'Anniversary Discount'},
        {discount: 'August Season Discount'}, 
        {discount: 'Back to School Discount'}, 
        {discount: 'Early Bird Special'}, 
        {discount: 'Holiday Special'}, 
        {discount: 'Limited Time Offer'}, 
        {discount: 'New Years Promotion'}, 
        {discount: 'Product Discount'}, 
        {discount: 'Product Review Reward Discount'}, 
        {discount: 'Referral Reward Discount'}, 
        {discount: 'Spring Season Discount'}, 
        {discount: 'Summer Season Discount'}, 
        {discount: 'Survey Reward Discount'}, 
        {discount: 'Weekend Deal'}, 
        {discount: 'Winter Season Discount'}
    ];

    const url = `products/getproducts`;
    const { data, loading, error } = useQuery<ProductResponse>(url);


    const getProductSpecials = async () => {
        try{
            //http://localhost:4200/products/getproductspecials
            const url = `products/getproductspecials`
            const response = await axios.get<GetSpecialsResponse>(`${apiEndPoint}/${url}`)
            setProductSpecials(response?.data)
            console.log("RETRIEVED ALL PRODUCT SPECIALS:", response)

        } catch (error) {
            console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
        }
    }

    const getProductDiscounts = async () => {
        try{
            //http://localhost:4200/products/getproductdiscounts
            const url = `products/getproductdiscounts`
            const response = await axios.get<GetDiscountsResponse>(`${apiEndPoint}/${url}`)
            setProductDiscounts(response?.data)
            console.log("RETRIEVED ALL PRODUCT SPECIALS:", response)

        } catch (error) {
            console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
        }
    }

    const setproductDiscount = async () => {
        if (discountIdx === null) {
            console.error('No product selected for discount');
            toast.error('No product selected for discount', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }

        try{
            //http://localhost:4200/products/setproductdiscounts
            const newStartDate = new Date(discountStartDate);
            const newExpDate = new Date(discountExpDate);
            console.log("new discount start date:", newStartDate)
            console.log("new discount expiry date:", newExpDate)

            const payload = {
                productID: discountIdx,
                discountName: discountName,
                discountValue: discountValue,
                discountTier: discountTier,
                startDate: newStartDate,
                endDate: newExpDate
            }

            const url = `products/setproductdiscount`
            const response = await axios.post<ProductResponse>(`${apiEndPoint}/${url}`, payload)
            console.log("The product discount has been set successfully", response.data)
            
            // Only show success notification if response is successful
            if (response.status === 200) {
                discountSuccessNotification();
            } else {
                console.error('Failed to set product special:', response);
                discountErrorNotification();
            }
        } catch (error) {
            console.log("An error was encountered when setting product discounts", error)
            discountErrorNotification();
        }
    }

    const setproductSpecial = async () => {
        if (specialId === null) {
            console.error('No product selected for special');
            toast.error('No product selected for special', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }

        try{
            //http://localhost:4200/products/setproductspecial - new route
            const newStartDate = new Date(specialStartDate);
            const newExpDate = new Date(specialExpDate);

            const payload = {
                productID: specialId,
                productCategory: specialProdCategory,
                special: special,
                specialType: specialType,
                startDate: newStartDate,
                expiryDate: newExpDate
            }

            const url = `products/setproductspecial`
            const response = await axios.post<SpecialResponse>(`${apiEndPoint}/${url}`, payload)
            console.log("The product special has been set successfully", response.data)

            // Only show success notification if response is successful
            if (response.status === 200) {
                specialSuccessNotification();
            } else {
                console.error('Failed to set product special:', response);
                specialErrorNotification();
            }
            
        } catch (error) {
            console.log("An error was encountered when setting product special", error)
            specialErrorNotification();
        }
    }

    const specialSuccessNotification = () => {
        toast.success('The product special has been set', {
            icon: <Check color={colors.green} size={24} />,
            duration: 3000,
        });
    };

    const discountSuccessNotification = () => {
        toast.success('The product discount has been set', {
            icon: <Check color={colors.green} size={24} />,
            duration: 3000,
        });
    };

    const specialErrorNotification = () => {
        toast.error('The product special has NOT been set', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        });
    };

    const discountErrorNotification = () => {
        toast.error('The product discount has NOT been set', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        });
    };

    useEffect(() => {
        getProductSpecials();
        getProductDiscounts();
    }, []);


    return (
        <div className='w-full h-screen overflow-y-auto mb-4 pr-4 space-y-6'>
            <div className='bg-white w-full rounded-lg p-4 shadow-dark'>
                        <h3>Discounts</h3>
                        <p className='text-gray-500'>Reward customers with discounts for completing actions.</p>
                        <div className='w-full flex justify-start gap-4 pt-8 pb-2 border-b'>
                                <table className='w-full table-fixed p-4'>
                                    <thead>
                                        <tr className='text-left h-10 p-2 text-md sm:text-sm font-medium'>
                                            <th className='p-2 w-[40px]'>ID</th>
                                            <th className='p-2 w-[100px]'>Product Name</th>
                                            <th className='p-2 w-[80px]'>Discount Price</th>
                                            <th className='p-2 w-[180px]'>Start Date</th>
                                            <th className='p-2 w-[180px]'>End Date</th>
                                            <th className='p-2 w-[70px]'>Tier</th>
                                            <th className='p-2 w-[70px]'>Active/Inactive</th>
                                            <th className='p-2 w-[70px]'>Action</th>
                                        </tr>
                                    </thead>
                                        <tbody className="mb-2">
                                            <tr className=''>
                                                <td className='p-2'>15</td>
                                                <td className='p-2'>Cheese Burger</td>
                                                <td className='p-2'>R20</td>
                                                <td className='p-2'>
                                                    {/* {product.Discount_Expiry ? `${new Date(product.Discount_Expiry).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'} */}
                                                    Tue Oct 01 2024 00:00:00 GMT+02:00
                                                </td>
                                                <td className='p-2'>
                                                    {/* {product.Special_ExpiryDate ? `${new Date(product.Special_ExpiryDate).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'} */}
                                                    Thu Oct 31 2024 00:00:00 GMT+02:00
                                                </td>
                                                <td className='p-2'>Alpha</td>
                                                <td className='p-2 pl-8'>
                                                    <Check size={24} color="green"/>
                                                </td>
                                                <td className='p-2'>
                                                    <button className="bg-black text-white p-2 w-full rounded-lg hover:bg-red">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                </table>
                        </div>
                        <div className='flex gap-2 pt-4'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-black text-white p-2 w-40 rounded-lg hover:bg-red">Add Discount</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>Set New Discount</DialogTitle>
                                <DialogDescription>
                                    Select the product and set the discount. Click save once completed.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="">
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Product
                                        </Label>
                                        <select 
                                            className="w-full p-2 rounded-lg border border-gray-300"
                                            onChange={(e) => setDiscountProductIdx(Number(e.target.value))} // Store the selected product idx
                                        >
                                                <option value="" className="dash-text">Select Product</option>
                                                {data?.map(({ idx, Product_Description }) =>
                                                    <option key={idx} value={idx}>{Product_Description}</option> //store idx instead of product description
                                                )}
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Discount:
                                        </Label>
                                        <select 
                                            className="w-full p-2 rounded-lg border border-gray-300"
                                            onChange={(e) => setDiscountName(e.target.value)}
                                        >
                                                <option value="" className="dash-text">Select Product Category</option>
                                                {discountOptions.map((option, index) => (
                                                    <option key={index} value={option.discount}>{option.discount}</option>
                                                ))}
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Discount Amount:
                                        </Label>
                                        <input type="input" placeholder="10" onChange={(e) => setDiscountValue(Number(e.target.value))} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                    <div>
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Discount Tier:
                                        </Label>
                                        <select 
                                            className="w-full p-2 rounded-lg border border-gray-300"
                                            onChange={(e) => setDiscountTier(e.target.value)}
                                        >
                                                <option>Select Tier</option>
                                                    <option value="All">All</option>
                                                    <option value="Omega">Omega</option>
                                                    <option value="Beta">Beta</option>
                                                    <option value="Alpha">Alpha</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="username" className="text-left pt-4">
                                            Start Date:
                                        </Label>
                                        <input type="date" onChange={(e) => setDiscountStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                    <div>
                                        <Label htmlFor="username" className="text-left pt-4">
                                            Expiry Date:
                                        </Label>
                                        <input type="date" onChange={(e) => setDiscountExpDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <button onClick={ setproductDiscount } className="bg-black text-white p-2 w-full rounded-lg hover:bg-red">
                                        Save
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        </div>
                    </div>
                    <div className='bg-white w-full rounded-lg p-4 pt-4 shadow-dark'>
                        <h3>Specials</h3>
                        <p className='text-gray-500'>Reward customers with specials for completing actions.</p>
                        <div className='w-full flex justify-start gap-4 pt-8 pb-2 border-b'>
                            <table className='w-full table-fixed p-4'>
                                    <thead>
                                        <tr className='text-left h-10 p-2 text-md sm:text-sm font-medium'>
                                            <th className='p-2 w-[40px]'>ID</th>
                                            <th className='p-2 w-[100px]'>Product</th>
                                            <th className='p-2 w-[80px]'>Special</th>
                                            <th className='p-2 w-[80px]'>Special Type</th>
                                            <th className='p-2 w-[180px]'>Start Date</th>
                                            <th className='p-2 w-[180px]'>Expiry Date</th>
                                            <th className='p-2 w-[70px]'>Action</th>
                                        </tr>
                                    </thead>
                                        <tbody className="mb-2">
                                            <tr className=''>
                                                <td className='p-2'>18</td>
                                                <td className='p-2'>SWITCH 400ML</td>
                                                <td className='p-2'>Buy 2 get 1 free</td>
                                                <td className='p-2'>
                                                    Combined Special
                                                </td>
                                                <td className='p-2'>
                                                    {/* {product.Special_ExpiryDate ? `${new Date(product.Special_ExpiryDate).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'} */}
                                                    Thu Oct 31 2024 00:00:00 GMT+02:00
                                                </td>
                                                <td className='p-2'>
                                                    {/* {product.Special_ExpiryDate ? `${new Date(product.Special_ExpiryDate).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'} */}
                                                    Thu Oct 31 2024 00:00:00 GMT+02:00
                                                </td>
                                                <td className='p-2'>
                                                    <button className="bg-black text-white p-2 w-full rounded-lg hover:bg-red">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                </table>
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
                                    Select the product and determine the special. Click save when you're done.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="">
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Product
                                        </Label>
                                        <select 
                                            className="w-full p-2 rounded-lg border border-gray-300"
                                            onChange={(e) => setSpecialProductId(Number(e.target.value))} // Store the selected product idx
                                        >
                                                <option value="" className="dash-text">Select Product</option>
                                                {data?.map(({ idx, Product_Description }) =>
                                                    <option key={idx} value={idx}>{Product_Description}</option> //store idx instead of product description
                                                )}
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Product Category:
                                        </Label>
                                        <select 
                                            className="w-full p-2 rounded-lg border border-gray-300"
                                            onChange={(e) => setSpecialProdCategory(e.target.value)}
                                        >
                                                <option>Select Tier</option>
                                                    <option value="All">All</option>
                                                    <option value="Drinks">Drinks</option>
                                                    <option value="Meat">Meat</option>
                                                    <option value="Other">Other</option>
                                                    <option value="Poultry">Poultry</option>
                                                    <option value="Processed Meats">Processed Meats</option>
                                                    <option value="Snacks">Snacks</option>
                                                    <option value="Staples/Grains">Staples/Grains</option>
                                                    <option value="Toiletries">Toiletries</option>
                                        </select>
                                    </div>
                                    <div className="">
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Special:
                                        </Label>
                                        <input type="input" placeholder="buy 2 and get 20% off next purchase" onChange={(e) => setSpecial(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                    <div className="">
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Special Category:
                                        </Label>
                                        <select 
                                            className="w-full p-2 rounded-lg border border-gray-300"
                                            onChange={(e) => setSpecialType(e.target.value)}
                                        >
                                                <option>Select Tier</option>
                                                    <option value="Case Group">Case Group</option>
                                                    <option value="Combined Special">Combined Special</option>
                                                    <option value="Combo Special">Combo Special</option>
                                        </select>
                                    </div>
                                    <div className="">
                                        <Label htmlFor="username" className="text-left pt-4">
                                            Start Date:
                                        </Label>
                                        <input type="date" onChange={(e) => setSpecialStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                    <div className="">
                                        <Label htmlFor="username" className="text-left pt-4">
                                            Expiry Date:
                                        </Label>
                                        <input type="date" onChange={(e) => setSpecialExpDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <button onClick={ setproductSpecial } className="bg-black text-white p-2 w-full rounded-lg hover:bg-red">
                                        Save
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        </div>
                    </div>
        </div>
    );
}

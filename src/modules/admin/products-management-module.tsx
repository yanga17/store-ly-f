'use client'

import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import MultiColorLoader from '@/lib/loaders';
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import toast from 'react-hot-toast';
import { XIcon, Check, Percent, Gem, X, Pencil } from "lucide-react";
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
    const [product, setProduct] = useState('');
    const [productSpecialDes, setProductSpecialDes] = useState('');
    const [specialPrice, setSpecialPrice] = useState(0);
    const [specialType, setSpecialType] = useState('');
    const [specialStartDate, setSpecialStartDate] = useState('');
    const [specialExpDate, setSpecialExpDate] = useState('');
    const [isActive, setIsActive] = useState(false);

    //product-group-specials
    const [specialGroupId, setSpecialGroupId] = useState(0); 
    const [groupProduct, setGroupProduct] = useState('');
    const [groupSpecial, setGroupSpecial] = useState('');
    const [specialGroupType, setSpecialGroupType] = useState('');
    const [groupSpecialPrice, setGroupSpecialPrice] = useState(0);
    const [groupSpecialStartDate, setGroupSpecialStartDate] = useState('');
    const [groupSpecialExpDate, setGroupSpecialExpDate] = useState('');
    const [groupIsActive, setGroupIsActive] = useState(false);
    
    //all product specials
    const [allSpecialProducts, setAllSpecialProducts] = useState<GetSpecialsResponse>([]);

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
            setAllSpecialProducts(response?.data)
            console.log("RETRIEVED ALL PRODUCT SPECIALS:", response)

        } catch (error) {
            console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
        }
    }

    const saveProductSpecial = async () => {
        try{
            //http://localhost:4200/products/setproductspecial - new route
            const newStartDate = new Date(specialStartDate);
            const newExpDate = new Date(specialExpDate);

            //product, productSpecialDes, specialPrice, specialStartDate, specialExpDate

            const payload = {
                product: product,
                specialDescription: productSpecialDes,
                specialPrice: specialPrice,
                specialType: specialType,
                startDate: newStartDate,
                expiryDate: newExpDate,
                isActive: isActive
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

    const saveProductGroupSpecial = async () => {
        try{
            //http://localhost:4200/products/setproductspecial - new route
            const newStartDate = new Date(groupSpecialStartDate);
            const newExpDate = new Date(groupSpecialExpDate);

            const payload = {
                specialGroupID: specialGroupId,
                product: groupProduct,
                special: groupSpecial,
                specialPrice: groupSpecialPrice,
                specialType: specialGroupType,
                startDate: newStartDate,
                expiryDate: newExpDate,
                isActive: isActive
            }

            const url = `products/setproductgpspecial`
            const response = await axios.post<SpecialResponse>(`${apiEndPoint}/${url}`, payload)
            console.log("The product group specials has been set successfully", response.data)

            // Only show success notification if response is successful
            if (response.status === 200) {
                groupSpecialSuccessNotification();
            } else {
                console.error('Failed to set product special:', response);
                groupSpecialErrorNotification();
            }
            
        } catch (error) {
            console.log("An error was encountered when setting product special", error)
            groupSpecialErrorNotification();
        }
    }

    const handleSpecialToggle = () => {
        setIsActive(!isActive); // Toggle the state
    };

    const handleGroupSpecialToggle = () => {
        setGroupIsActive(!groupIsActive); // Toggle the state
    };

    //NOTIFICATIONS
    const specialSuccessNotification = () => {
        toast.success('The product special has been set', {
            icon: <Check color={colors.green} size={24} />,
            duration: 3000,
        });
    };

    const groupSpecialSuccessNotification = () => {
        toast.success('The group special has been set for the products', {
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

    const groupSpecialErrorNotification = () => {
        toast.error('The group special has been set for the products', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000
        });
    };

    // useEffect(() => {
    //     getProductSpecials();
    //     getProductDiscounts();
    // }, []);


    return (
        <div className='w-full h-screen overflow-y-auto mb-4 pr-4 space-y-6'>
            <div className='bg-white w-full rounded-lg p-4 shadow-dark'>
                        <h3>Specials</h3>
                        <p className='text-gray-500'>Reward customers with specials for completing actions.</p>
                        <div className='w-full flex justify-start gap-4 pt-8 pb-2 border-b'>
                                <table className='w-full table-fixed p-4'>
                                    <thead>
                                        <tr className='text-left h-10 p-2 text-md sm:text-sm font-medium'>
                                            <th className='p-2 w-[40px]'>ID</th>
                                            <th className='p-2 w-[120px]'>Product</th>
                                            <th className='p-2 w-[115px]'>Special</th>
                                            <th className='p-2 w-[105px]'>Special Value</th>
                                            <th className='p-2 w-[155px]'>Start Date</th>
                                            <th className='p-2 w-[170px]'>Expiry Date</th>
                                            <th className='p-2 w-[60px]'>Action</th>
                                        </tr>
                                    </thead>
                                        <tbody className="mb-2">
                                            <tr className=''>
                                                <td className='p-2'>15</td>
                                                <td className='p-2'>Cheese Burger</td>
                                                <td className='p-2'>Buy 2 get 10% Off</td>
                                                <td className='p-2'>Percentage</td>
                                                <td className='p-2'>
                                                    {/* {product.Discount_Expiry ? `${new Date(product.Discount_Expiry).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'} */}
                                                    Tue Oct 01 2024 00:00:00
                                                </td>
                                                <td className='p-2'>
                                                    {/* {product.Special_ExpiryDate ? `${new Date(product.Special_ExpiryDate).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'} */}
                                                    Thu Oct 31 2024 00:00:00
                                                </td>
                                                <td className='p-2'>
                                                    <button className="bg-black text-white p-2 w-14 h-18 rounded-lg hover:bg-red flex justify-center items-center">
                                                        <Pencil size={18} color="white"/>
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
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                <DialogTitle>Set New Product Special</DialogTitle>
                                <DialogDescription>
                                    Select the product and set the special with the required fields. Click save once completed.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Product
                                            </Label>
                                            <select 
                                                className="w-full p-2 rounded-lg border border-gray-300"
                                                onChange={(e) => setProduct(e.target.value)} // Store the selected product idx
                                            >
                                                    <option value="" className="dash-text">Select Product</option>
                                                    {data?.map(({ idx, Product_Description }) =>
                                                        <option key={idx} value={Product_Description}>{Product_Description}</option> //store idx instead of product description
                                                    )}
                                            </select>
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Special:
                                            </Label>
                                            <input type="input" placeholder="10" onChange={(e) => setProductSpecialDes(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Special Price:
                                            </Label>
                                            <input type="input" placeholder="10" onChange={(e) => setSpecialPrice(Number(e.target.value))} className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Special Type:
                                            </Label>
                                            <select 
                                                className="w-full p-2 rounded-lg border border-gray-300"
                                                onChange={(e) => setSpecialType(e.target.value)}
                                            >
                                                    <option>Select Type</option>
                                                        <option value="Special">Special</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Special Value:
                                            </Label>
                                            <select 
                                                className="w-full p-2 rounded-lg border border-gray-300"
                                                onChange={(e) => setSpecialType(e.target.value)}
                                            >
                                                    <option>Select Value</option>
                                                        <option value="Percentage">Percentage</option>
                                                        <option value="Amount">Amount</option>
                                            </select>
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="username" className="text-left pt-4">
                                                Start Date:
                                            </Label>
                                            <input type="date" onChange={(e) => setSpecialStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-[270px]">
                                            <Label htmlFor="username" className="text-left pt-4">
                                                Expiry Date:
                                            </Label>
                                            <input type="date" onChange={(e) => setSpecialExpDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className="flex flex-col">
                                            <Label htmlFor="isactive" className="text-left p-1">
                                                Active/Inactive:
                                            </Label>
                                            <div className="checkbox-apple">
                                                <input className="yep" 
                                                id="check-apple" 
                                                type="checkbox" 
                                                onClick={ handleSpecialToggle }
                                            />
                                                <label htmlFor="check-apple"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <button onClick={ saveProductSpecial } className="bg-black text-white p-2 w-full rounded-lg hover:bg-red">
                                        Save
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        </div>
                    </div>
                    <div className='bg-white w-full rounded-lg p-4 pt-4 shadow-dark'>
                        <h3>Group Specials</h3>
                        <p className='text-gray-500'>Reward customers with specials for completing actions.</p>
                        <div className='w-full flex justify-start gap-4 pt-8 pb-2 border-b'>
                            <table className='w-full table-fixed p-4'>
                                    <thead>
                                        <tr className='text-left h-10 p-2 text-md sm:text-sm font-medium'>
                                            <th className='p-2 w-[50px]'>Group ID</th>
                                            <th className='p-2 w-[110px]'>Product</th>
                                            <th className='p-2 w-[100px]'>Special</th>
                                            <th className='p-2 w-[100px]'>Special Type</th>
                                            <th className='p-2 w-[80px]'>Special Price</th>
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
                                                    80.00
                                                </td>
                                                <td className='p-2'>
                                                    {/* {product.Special_ExpiryDate ? `${new Date(product.Special_ExpiryDate).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'} */}
                                                    Thu Oct 31 2024 00:00:00
                                                </td>
                                                <td className='p-2'>
                                                    {/* {product.Special_ExpiryDate ? `${new Date(product.Special_ExpiryDate).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'} */}
                                                    Thu Oct 31 2024 00:00:00
                                                </td>
                                                <td className='p-2'>
                                                    <button className="bg-black text-white p-2 w-14 h-18 rounded-lg hover:bg-red flex justify-center items-center">
                                                        <Pencil size={18} color="white" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                </table>
                        </div>
                        <div className='flex gap-2 pt-4'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-black text-white p-2 w-40 rounded-lg hover:bg-red">Add Group Special</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                <DialogTitle>Add New Group Special</DialogTitle>
                                <DialogDescription>
                                    Select the product and set the special with the required fields. Click save once completed.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Special ID:
                                            </Label>
                                            <select 
                                                className="w-full p-2 rounded-lg border border-gray-300"
                                                onChange={(e) => setSpecialGroupId(Number(e.target.value))} // Store the selected product idx
                                            >
                                                    <option value="" className="dash-text">Select Special</option>
                                                        <option value="1">Buy 3 Get 20% Off</option>
                                                        <option value="2">Buy 1 Get 5% Off</option>
                                                        <option value="3">Buy 4 Get 15% Off</option>
                                                        <option value="4">Buy 2 Get R20 Off</option>
                                                        <option value="5">Buy 3 Get R50 Off</option>
                                            </select>
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Product:
                                            </Label>
                                            <select 
                                                className="w-full p-2 rounded-lg border border-gray-300"
                                                onChange={(e) => setGroupProduct(e.target.value)}
                                            >
                                                    {data?.map(({ idx, Product_Description }) =>
                                                        <option key={idx} value={Product_Description}>{Product_Description}</option>
                                                    )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Special:
                                            </Label>
                                            <input type="input" placeholder="buy 2 and get 20% off next purchase" onChange={(e) => setGroupSpecial(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Special Price:
                                            </Label>
                                            <input type="input" placeholder="10.99" onChange={(e) => setGroupSpecialPrice(Number(e.target.value))} className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Special Type:
                                            </Label>
                                            <select 
                                                className="w-full p-2 rounded-lg border border-gray-300"
                                                onChange={(e) => setSpecialGroupType(e.target.value)}
                                            >
                                                    <option>Select Type</option>
                                                        <option value="Combined Special">Combined Special</option>
                                            </select>
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="name" className="text-left pt-4">
                                                Special Value:
                                            </Label>
                                            <select 
                                                className="w-full p-2 rounded-lg border border-gray-300"
                                                onChange={(e) => setSpecialType(e.target.value)}
                                            >
                                                    <option>Select Value</option>
                                                        <option value="Percentage">Percentage</option>
                                                        <option value="Amount">Amount</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="username" className="text-left pt-4">
                                                Start Date:
                                            </Label>
                                            <input type="date" onChange={(e) => setGroupSpecialStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="username" className="text-left pt-4">
                                                Expiry Date:
                                            </Label>
                                            <input type="date" onChange={(e) => setGroupSpecialExpDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full">
                                            <Label htmlFor="isactive" className="text-left pt-4">
                                                Active/Inactive:
                                            </Label>
                                            <div className="checkbox-apple">
                                                <input className="yep" 
                                                id="check-apple" 
                                                type="checkbox" 
                                                onClick={ handleGroupSpecialToggle }
                                            />
                                                <label htmlFor="check-apple"></label>
                                            </div>
                                        </div>
                                </div>
                                <DialogFooter>
                                    <button onClick={ saveProductGroupSpecial } className="bg-black text-white p-2 w-full rounded-lg hover:bg-red">
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
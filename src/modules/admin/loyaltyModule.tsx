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
import { format } from "date-fns";
import { toast } from 'react-hot-toast';
import { SurveyDialog } from "@/components/component/survey-dialog"; 
import { ReferralsDialog } from "@/components/component/referrals-dialog";
import { ReviewDialog } from "@/components/component/review-dialog";
import {
    X, Check, Gem, PercentDiamond, ScrollText, Speech, Twitter,
    Facebook, Instagram, Linkedin, Popcorn, IceCream2, Pizza, 
    Citrus, NotepadText, Notebook, BookOpenText, MenuSquare, Soup 
} from "lucide-react";

//getAllProducts - tblproducts
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
    SpecialID: number,
    ProductID: number,
    SpecialName: string,
    SpecialValue: string,
    StartDate: string,
    ExpiryDate: string,
    IsActive: number
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

export const LoyaltyModule = () => {
    const [discountIdx, setDiscountProductIdx] = useState<number | null>(null); // Store product idx for discount
    const [discountName, setDiscountName] = useState('');
    const [discountValue, setDiscountValue] = useState(0);
    const [discountTier, setDiscountTier] = useState('');
    const [discountStartDate, setDiscountStartDate] = useState('');
    const [discountExpDate, setDiscountExpDate] = useState(''); 
    const [allDiscountedProducts, setProductDiscounts] = useState<GetDiscountsResponse>([]);

    const [specialIdx, setSpecialProductIdx] = useState<number | null>(null); // Store product idx for special
    const [special, setSpecial] = useState('');
    const [specialValue, setSpecialValue] = useState(0);
    const [specialStartDate, setSpecialStartDate] = useState('');
    const [specialExpDate, setSpecialExpDate] = useState('');
    const [active, setActive] = useState(0);
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

    const url = `products/getproducts`
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
        if (specialIdx === null) {
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
            console.log("new start date:", newStartDate)
            console.log("new expiry date:", newExpDate)

            const payload = {
                productID: specialIdx,
                specialName: special,
                specialValue: specialValue,
                startDate: newStartDate,
                expiryDate: newExpDate,
                isActive: active
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
        <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-52'>
                <div className="w-full flex gap-16">
                    <div className="bg-white w-[500px] h-[480px] py-2 px-2 rounded shadow-dark">
                        <h3>Surveys</h3>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <ScrollText />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Signing up for the loyalty program</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <NotepadText />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Signing up for the loyalty program</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <MenuSquare />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Signing up for the loyalty program</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Notebook />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Signing up for the loyalty program</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <BookOpenText />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Signing up for the loyalty program</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='py-4'>
                            <SurveyDialog />
                        </div>
                    </div>
                    <div className="bg-white w-[500px] h-[480px] py-2 px-2 rounded shadow-dark">
                        <h3>Product Reviews</h3>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Popcorn />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Product Feedback Review</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Citrus />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Customer Satisfaction Review (Loyalty Prgram)</p>
                                    <p className="text-sm text-gray-400 pt-1">15% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Soup />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Wishlist and Improvement Review</p>
                                    <p className="text-sm text-gray-400 pt-1">5% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Pizza />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Discounts and Special Offers Review</p>
                                    <p className="text-sm text-gray-400 pt-1">5% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <IceCream2 />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Branch and Location Feedback Review</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='pt-4'>
                            <ReviewDialog />
                        </div>
                    </div>
                    <div className="bg-white w-[500px] h-[480px] py-2 px-2 rounded shadow-dark">
                        <h3>Referrals</h3>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Speech />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Introducing a new customer to the loyalty program</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Instagram />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Follow our Instagram Account</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Facebook />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Follow our Facebook Account</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Twitter />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Follow our Twitter Account</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 pb-2 border-b pt-4'>
                            <div className='w-full flex justify-start gap-4'>
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Linkedin />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">Follow our LinkedIn Account</p>
                                    <p className="text-sm text-gray-400 pt-1">10% Discount on any purchase</p>
                                </div>
                            </div>
                        </div>
                        <div className='pt-4'>
                            <ReferralsDialog />
                        </div>
                    </div>
                </div>
        </div>
    );
}
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SurveyDialog } from "@/components/component/survey-dialog"; 
import { ReviewDialog } from "@/components/component/review-dialog";
import {
    Smartphone, Mail, MessageSquare, Globe, QrCode, ScrollText, Tag,
    Popcorn, IceCream2, Pizza, Citrus, NotepadText, Notebook, BookOpenText, MenuSquare, Soup 
} from "lucide-react";


export const RewardsModule = () => {

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

    return (
        <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-52'>
            <Card>
                <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Alternative Ways to Redeem Discounts</h2>
                <ul className="space-y-4">
                    <li className="flex items-center">
                    <QrCode className="h-5 w-5 mr-2 text-primary" />
                    <span>In-store kiosks: Customers can scan their loyalty card or enter their phone number to retrieve available discounts.</span>
                    </li>
                    <li className="flex items-center">
                    <Smartphone className="h-5 w-5 mr-2 text-primary" />
                    <span>Mobile app: Customers can view and activate their discounts directly from our mobile application.</span>
                    </li>
                    <li className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    <span>Email notifications: We send personalized emails with discount codes that can be used online or in-store.</span>
                    </li>
                    <li className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    <span>SMS: Customers can opt-in to receive text messages with their available discounts and redemption codes.</span>
                    </li>
                    <li className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    <span>Website account: Logged-in customers can see and apply their discounts during online checkout.</span>
                    </li>
                </ul>
                </CardContent>
            </Card>
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Recently Added Specials & Discounts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                        {[
                            { name: "Summer Fruits Bonanza", start: "2023-06-01", end: "2023-06-30", products: "All summer fruits", usage: 234 },
                            { name: "Gourmet Cheese Festival", start: "2023-07-01", end: "2023-07-15", products: "Imported cheeses", usage: 156 },
                            { name: "Organic Veggies Week", start: "2023-07-01", end: "2023-07-07", products: "Organic vegetables", usage: 89 },
                            { name: "Artisan Bread Showcase", start: "2023-06-15", end: "2023-06-25", products: "Artisan breads", usage: 112 },
                        ].map((promo, index) => (
                            <li key={index} className="border-b pb-2">
                            <div className="flex items-center">
                                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-semibold">{promo.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {promo.start} to {promo.end} | {promo.products}
                            </p>
                            <p className="text-sm">Used by {promo.usage} customers</p>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
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
                </div>
        </div>
    );
}
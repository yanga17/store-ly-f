"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, CreditCard, DollarSign, FileText, Edit, CheckCircle, Coins, Hourglass } from "lucide-react"
import Image from "next/image"
import {  CarouselDApiDemo } from "@/components/component/products-banner"

export default function HomePage() {
  return (
    <div className="p-2 h-screen overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">Loyalty Program Metrics</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-green">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Loyalty Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,342</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-blue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Earned (This Month)</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245,678</div>
            <p className="text-xs text-muted-foreground">23,456 redeemed</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyalty-Driven Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,456</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-red">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non-Loyalty-Driven Revenue</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$67,890</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Current Promotions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="overflow-hidden">
          <Image src="/covers/kingsley.jpeg" width={400} height={200} alt="KINGSLEY 2LTR ASST Special" className="w-full object-cover" />
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">KINGSLEY 2LTR ASST Special</h3>
            <p className="text-sm text-muted-foreground mb-2">Buy 1, Get 1 Free on all Kingsley 2L drinks</p>
            <p className="text-sm font-medium">Ends: October 31, 2024</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <Image src="/covers/switch.jpeg" width={400} height={200} alt="SWITCH 440ML Discount" className="w-full object-cover" />
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">SWITCH 440ML Discount</h3>
            <p className="text-sm text-muted-foreground mb-2">20% off on all SWITCH 440ML beverages</p>
            <p className="text-sm font-medium">Ends: November 15, 2024</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <Image src="/covers/chucktwo.jpeg" width={400} height={200} alt="Beef Chuck Special" className="w-full h- object-cover" />
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">Beef Chuck Special</h3>
            <p className="text-sm text-muted-foreground mb-2">10% off on all cuts of Beef Chuck</p>
            <p className="text-sm font-medium">Ends: October 20, 2024</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <Image src="/covers/artisanBread.jpeg" width={400} height={200} alt="Artisan Bread Discount" className="w-full object-cover" />
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">Artisan Bread Discount</h3>
            <p className="text-sm text-muted-foreground mb-2">25% off on all Artisan Breads</p>
            <p className="text-sm font-medium">Ends: October 25, 2024</p>
          </CardContent>
        </Card>
      </div>
      {/* <div>
        <CarouselDApiDemo />
      </div> */}
    <h2 className="text-2xl font-semibold mb-4">Promotions Management</h2>
    <div className="grid gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Specials</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Special Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Redemptions</TableHead>
                <TableHead>Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: "KINGSLEY 2LTR ASST Summer Sale",
                  type: "Percentage",
                  start: "Thu Jun 01 2023 00:00:00 GMT+02:00",
                  end: "Fri Jun 30 2023 00:00:00 GMT+02:00",
                  redemptions: 300,
                  active: true,
                },
                {
                  name: "SWITCH 440ML Drink Promo",
                  type: "Amount",
                  start: "Sat Jul 01 2023 00:00:00 GMT+02:00",
                  end: "Sat Jul 15 2023 00:00:00 GMT+02:00",
                  redemptions: 180,
                  active: true,
                },
                {
                  name: "ZAPNAX Cheeky Chilly Snack Bonanza",
                  type: "Percentage",
                  start: "Sat Jul 01 2023 00:00:00 GMT+02:00",
                  end: "Fri Jul 07 2023 00:00:00 GMT+02:00",
                  redemptions: 120,
                  active: true,
                },
                {
                  name: "Artisan Cheese & Dairy Festival",
                  type: "Amount",
                  start: "Thu Jun 15 2023 00:00:00 GMT+02:00",
                  end: "Sun Jun 25 2023 00:00:00 GMT+02:00",
                  redemptions: 90,
                  active: false,
                },
              ].map((promo, index) => (
                <TableRow key={index}>
                  <TableCell>{promo.name}</TableCell>
                  <TableCell>{promo.type}</TableCell>
                  <TableCell>{promo.start}</TableCell>
                  <TableCell>{promo.end}</TableCell>
                  <TableCell>{promo.redemptions}</TableCell>
                  <TableCell>
                    {promo.active ? (
                      <span className="text-green">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="text-green">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Specials</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Special Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: "Back to School Lunch Specials",
                  start: "Tue Aug 15 2023 00:00:00 GMT+02:00",
                  expiry: "Wed Sep 15 2023 00:00:00 GMT+02:00",
                  type: "Percentage",
                },
                {
                  name: "Fall Harvest Festival",
                  start: "Fri Sep 01 2023 00:00:00 GMT+02:00",
                  expiry: "Sun Oct 01 2023 00:00:00 GMT+02:00",
                  type: "Amount",
                },
              ].map((promo, index) => (
                <TableRow key={index}>
                  <TableCell>{promo.name}</TableCell>
                  <TableCell>{promo.type}</TableCell>
                  <TableCell>{promo.start}</TableCell>
                  <TableCell>{promo.expiry}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
      {/* <h2 className="text-2xl font-semibold mb-4">Alternative Ways to Redeem Discounts</h2>
      <Card>
        <CardContent className="pt-6">
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

      <h2 className="text-2xl font-semibold my-4">Recent Activity</h2>
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
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Surveys</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { title: "Customer Satisfaction Q2", completionRate: "68%", reward: "10% off next purchase" },
                { title: "Product Feedback: Summer Fruits", completionRate: "45%", reward: "100 bonus points" },
              ].map((survey, index) => (
                <li key={index} className="border-b pb-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-semibold">{survey.title}</span>
                  </div>
                  <p className="text-sm">Completion Rate: {survey.completionRate}</p>
                  <p className="text-sm text-muted-foreground">Reward: {survey.reward}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    // </div>
  )
}
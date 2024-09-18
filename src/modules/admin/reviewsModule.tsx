'use client'

import { Star, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'react-hot-toast';
import { useQuery } from "@/hooks/useQuery";
import * as React from "react";
import {useState, useEffect, createContext } from 'react';
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';

interface ReviewProps {
    id: number,
    client_name: string,
    client_image: Buffer,
    product: string,
    rating: number,
    date: string,
    comment: string
}

type ReviewResponse = ReviewProps[]


const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    product: "Cheese Burger",
    rating: 5,
    date: "Fri Aug 16 2024 00:00:00 GMT+02:00",
    comment: "The cheese burger was absolutely delicious! The patty was juicy, and the cheese was perfectly melted. I'll definitely be ordering this again."
  },
  {
    id: 2,
    name: "Sarah Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    product: "Veggie Meal",
    rating: 4,
    date: "Fri Aug 23 2024 00:00:00 GMT+02:00",
    comment: "I really enjoyed the veggie meal. It was fresh and flavorful. The portion size was generous, and I felt satisfied after eating. Just wish there was a bit more variety in the vegetables."
  },
  {
    id: 3,
    name: "Mike Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    product: "Spicy Chips",
    rating: 3,
    date: "Thu Aug 18 2024 00:00:00 GMT+02:00",
    comment: "The spicy chips had a good kick to them, but I found them a bit too salty for my taste. They're okay, but I probably won't order them again."
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    product: "Family Meal Deal",
    rating: 5,
    date: "Wed Sep 11 2024 00:00:00 GMT+02:00",
    comment: "The family meal deal was fantastic! Great variety, ample portions, and everything was delicious. It's perfect for a family dinner and great value for money."
  },
  {
    id: 5,
    name: "Chris Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    product: "Chicken Wrap",
    rating: 4,
    date: "Mon Aug 26 2024 00:00:00 GMT+02:00",
    comment: "I loved the chicken wrap! The chicken was tender and well-seasoned. The vegetables were fresh and crispy. My only suggestion would be to add a bit more sauce."
  },
  {
    id: 6,
    name: "Lisa Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    product: "Fish and Chips",
    rating: 5,
    date: "Thur Aug 01 2024 00:00:00 GMT+02:00",
    comment: "The fish and chips were outstanding! The fish was perfectly cooked with a crispy batter, and the chips were golden and crunchy. Definitely recommend!"
  }
]

export const ReviewsModule = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [productData, setProductData] = useState<ReviewResponse>([]);

  const getReviews = async () => {
    try {
      setLoading(true);
      const url = `admin/getproductreviews`;
      const response = await axios.get<ReviewResponse>(`${apiEndPoint}/${url}`);
      setProductData(response.data);
      console.log("Customer Product Views have returned:", response.data);

      if (response.data.length === 0) {
        setEmpty(true);
      }
    } catch (error) {
      console.log("There was an error fetching the product reviews", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Customer Product Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productData?.map(({ id, client_name, client_image, product, rating, date, comment }) => {
            // Convert the LONGBLOB (client_image) to base64 string
            const avatar = client_image ? Buffer.from(client_image).toString('base64') : null;

            return (
              <Card key={id} className="flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4">
                  {avatar ? (
                    <Avatar>
                      <AvatarImage
                        src={`data:image/png;base64,${avatar}`}
                        alt={client_name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </Avatar>
                  ) : (
                    <Avatar>
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col">
                    <CardTitle className="text-lg">{client_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {date ? `${new Date(date).toString().split(' ').slice(1, 5).join(' ')}` : '--:--'}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary">{product}</Badge>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < rating ? "text-yellow fill-yellow" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm flex-grow">{comment}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

"use client"
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { getProductDetails } from "@/lib/actions/actions";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";

const Wishlist = () => {
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState(true);
    const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
    const [wishlist, setWishlist] = useState<ProductType[]>([]);

    const getUser = async () => {
        try {
            const res = await fetch("/api/users")
            const data = await res.json()
            setSignedInUser(data)
            setIsLoading(false)
        } catch (err) {
            console.log("[users_GET", err)
        }
    };

    useEffect(() => {
        if (user) getUser()

    }, [user]);

    const getWishlistProducts = async () => {
        setIsLoading(true);

        if (!signedInUser) return;

        const wishlistProducts = await Promise.all(signedInUser.wishlist.map(async (productId) => {
            const res = await getProductDetails(productId)
            return res
        }));

        setWishlist(wishlistProducts);
        setIsLoading(false);
    }

    useEffect(() => {
        if (signedInUser) {
            getWishlistProducts()
        }
    }, [signedInUser])

    const updateSignedInUser = (updatedUser: UserType) => {
        setSignedInUser(updatedUser)
    };

    return isLoading ? <Loader /> : (
        <div className="px-10 py-5">
            <p className="text-heading3-bold my-10">Your Wishlist</p>
            {wishlist.length === 0 && (
                <p>No items in your wishlist</p>
            )}

            <div className="flex flex-wrap justify-start gap-16">
                {wishlist.map((product) => (
                    <ProductCard key={product._id} productData={product} updateSignedInUser={updateSignedInUser} />
                ))}
            </div>
        </div>
    )
}

export const dynamic = "force-dynamic";

export default Wishlist
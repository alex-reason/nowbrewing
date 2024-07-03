import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        await connectToDB()

        const user = await User.findOne({ clerkId: userId });
        if (!user) return new NextResponse("User not found", { status: 404 });

        const { productId } = await req.json()
        if (!productId) return new NextResponse("Product ID required", { status: 400 })

        const isLiked = user.wishlist.includes(productId)

        if (isLiked) {
            user.wishlist = user.wishlist.filter((item: string) => item != productId)
        } else {
            user.wishlist.push(productId)
        }

        await user.save()

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.log("[Wishlist_POST] error", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic";
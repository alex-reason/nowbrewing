"use client"
import { useState } from "react";

import HeartFavorite from "@/components/HeartFavorite";
import useCart from "@/lib/hooks/useCart";
import Quantity from "@/components/Quantity";


const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
    const [quantity, setQuantity] = useState<number>(1);

    const cart = useCart()

    return (
        <div className='max-w-[25rem] flex flex-col gap-4'>
            <div className='flex justify-between items-center gap-2 border-b border-black-1 pb-2'>
                <div className="flex items-center gap-2">
                    <h3 className="text-heading3-bold">{productInfo.title}</h3>
                    <p className="text-base-medium text-grey-1">{productInfo.category}</p>
                    <p className="text-base-medium text-grey-1">({productInfo.size})</p>
                </div>
                <HeartFavorite product={productInfo} />
            </div>

            <h3 className="text-heading3-bold">${productInfo.price}</h3>

            <p className="text-small-medium text-black-1">{productInfo.description}</p>

            {/* <div className="flex items-center gap-4">
                <FiMinusCircle className="hover:text-red-1 cursor-pointer text-base-medium" onClick={() => quantity > 1 && setQuantity(quantity - 1)} />
                <p className=" text-base bg-grey-2 px-2 rounded-md">{quantity}</p>
                <FiPlusCircle className="hover:text-blue-1 cursor-pointer text-base-medium" onClick={() => quantity < 99 && setQuantity(quantity + 1)} />
            </div> */}

            <Quantity
                increaseQuantity={() => quantity < 99 && setQuantity(quantity + 1)}
                decreaseQuantity={() => quantity > 1 && setQuantity(quantity - 1)}
                currQuantity={quantity}
            />

            <button
                className="mt-8 border border-black-1 text-base-bold hover:bg-black-1 hover:text-white-1 px-2 py-4 rounded-sm"
                onClick={() => cart.addItem({ item: productInfo, quantity })}
            >
                Add to Cart
            </button>
        </div>
    )
}

export default ProductInfo
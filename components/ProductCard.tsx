"use client"
import Image from "next/image"
import Link from "next/link"
import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
    productData: ProductType;
    updateSignedInUser?: (updatedUser: UserType) => void;
  }

const ProductCard = ({ productData, updateSignedInUser }: ProductCardProps) => {

    return (
        <Link href={`/products/${productData._id}`} key={productData._id}>
            <Image
                src={productData.media[0]}
                alt={productData.title}
                width={200}
                height={50}
                className='rounded-lg cursor-pointer h-60 w-40 object-cover'
            />
            <p>
                <span className='uppercase'>{productData.title} </span>
                <span className="text-small text-grey-3 font-light">({productData.size}.)</span>
            </p>
            <p className="text-small-medium text-grey-3 font-light">{productData.category}</p>
            <div className="flex justify-between items-center">
                <p className="text-base-bold">${productData.price}</p>
                <HeartFavorite product={productData} updateSignedInUser={updateSignedInUser} />
            </div>
        </Link>
    )
}

export default ProductCard
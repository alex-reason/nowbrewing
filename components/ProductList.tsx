import { getProducts } from "@/lib/actions/actions"
import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './ProductCard'

const ProductList = async () => {
    const products = await getProducts()
    return (
        <div className='flex flex-col items-center gap-10 py-8 px-5'>
            <h1 className='text-heading2 text-black-1 uppercase mb-8'>Coffee Beans</h1>

            {!products || products.length === 0 ? <p className='text-body-bold'>No products found. Try again later</p> :
                <div className='flex flex-wrap mx-auto items-center justify-centers gap-16'>
                    {products.map((item: ProductType) => (
                        <ProductCard key={item._id} productData={item} />
                    ))}
                </div>
            }
        </div>
    )   
}

export default ProductList
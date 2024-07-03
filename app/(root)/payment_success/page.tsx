"use client"
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import thanksImg from '@/public/blush - by Elina Giglio.png'
import useCart from '@/lib/hooks/useCart';

const SuccessfulPaypment = () => {
    const cart = useCart();

    useEffect(() => {
        cart.clearCart();
    }, [])

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <Image src={thanksImg} height={100} width={100} className='h-20 w-20 object-contain' alt="thanks! illustration by Elina Cecilia Giglio"/>
            <h4 className='text-heading4-bold text-blue-1'>Order Successful</h4>
            <p>Thank you for your purchase</p>
            <Link
                href="/"
                className="mt-8 border border-black-1 text-base-bold hover:bg-black-1 hover:text-white-1 px-2 py-4 rounded-sm"
            >
                Back to Store
            </Link>
        </div>
    )
}
export const dynamic = "force-dynamic";
export default SuccessfulPaypment
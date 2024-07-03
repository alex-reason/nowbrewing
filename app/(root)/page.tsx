import Image from 'next/image'
import React from 'react'

import Collections from '@/components/Collections'
import ProductList from '@/components/ProductList'

const page = () => {
  return (
    <div className='w-full shadow-lg'>
      <Image src='/header.jpg' alt="now brewing banner" width={1000} height={600} className='w-full h-60 object-cover *:'/>
      <Collections />
      <ProductList />
    </div>
  )
}
export const dynamic = "force-dynamic";

export default page;


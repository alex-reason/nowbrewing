import Link from 'next/link';
import Image from 'next/image';

import { getCollections } from "@/lib/actions/actions"

const Collections = async () => {
    const collections = await getCollections()

    return (
        <div className='flex flex-col items-center py-8 px-5 gap-10'>

            <h1 className='text-heading2 text-black-1 uppercase mb-8'>Collections</h1>
            <div className='flex items-center justify-centers gap-8'>
                {!collections || collections.length === 0 ? <p className='text-body-bold'>No collections found</p> :
                    collections.map((item: CollectionType) => (
                        <Link href={`/collections/${item._id}`} key={item._id}>
                            <Image src={item.image} alt={item.title} width={200} height={50} className='rounded-lg cursor-pointer h-40 w-80 object-cover' />
                            <p className='uppercase'>{item.title}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Collections
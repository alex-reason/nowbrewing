import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";

const CollectionDetails = async ({ params, }: { params: { collectionId: string } }) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);

  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <Image
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[200px] object-cover rounded-xl"
      />
      <h3 className="text-heading3-bold text-grey-1">{collectionDetails.title}</h3>
      <p className="text-body-normal text-grey-1 text-center max-w-[900px]">{collectionDetails.description}</p>
      <div className="flex flex-wrap gap-16 justify-center">
        {collectionDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} productData={product} />
        ))}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default CollectionDetails;

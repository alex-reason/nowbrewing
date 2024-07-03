import Gallery from "@/components/Gallery"
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo"
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions"

const ProductDetails = async ({ params }: { params: { productId: string } }) => {
    const productDetails = await getProductDetails(params.productId);
    const relatedProducts = await getRelatedProducts(params.productId);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-center items-start gap-16 py-10 px-5 mt-4 max-md:flex-col max-md:items-center">
                <Gallery productMedia={productDetails.media} />
                <ProductInfo productInfo={productDetails} />
            </div>
            <div className="flex flex-col items-center px-3 md:px-10 py-5 ">
                <h3 className="text-heading3-bold">You might also like:</h3>
                <div className="flex flex-wrap gap-16 mx-auto mt-8">
                    {relatedProducts?.map((product: ProductType) => (
                        <div className="opacity-80 hover:opacity-100" key={product._id}>
                            <ProductCard productData={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const dynamic = "force-dynamic";

export default ProductDetails;


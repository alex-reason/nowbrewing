import Image from "next/image"

const OrderCard = ({ orderItem }: { orderItem: OrderItemType }) => {
    return (
        <figure className="flex gap-4" >
            <Image
                src={orderItem.product.media[0]}
                alt={orderItem.product.title}
                width={100}
                height={100}
                className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between">
                <p className="text-small-medium">
                    Product:{" "}
                    <span className="text-small-bold">
                        {orderItem.product.title}
                    </span>
                </p>

                <p className="text-small-medium">
                    Unit price:{" "}
                    <span className="text-small-bold">${orderItem.product.price}</span>
                </p>
                <p className="text-small-medium">
                    Quantity:{" "}
                    <span className="text-small-bold">{orderItem.quantity}</span>
                </p>
            </div>
        </figure>
    )
}

export default OrderCard
import { auth } from "@clerk/nextjs/server";

import { getOrders } from "@/lib/actions/actions";
import OrderCard from "@/components/OrderCard";

const Orders = async () => {
    const { userId } = auth();
    const orders = await getOrders(userId as string);

    return (
        <div className="py-5 px-3 sm:px-10">
            <h3 className="text-heading3-bold my-10">Your Orders</h3>
            {!orders || orders.length === 0
                && <p className="text-body-bold my-5">You have no orders yet.</p>
            }

            <div className="flex flex-col gap-10">
                {orders?.map((order: OrderType) => (
                    <div className="flex flex-col gap-8 p-4 hover:bg-grey-2" key={order._id}>

                        <div className="flex gap-20 max-md:flex-col max-md:gap-3">
                            <p className="text-base-bold">Order ID: {order._id}</p>
                            <p className="text-base-bold"> Total Amount: ${order.totalAmount}</p>
                        </div>

                        <div className="flex flex-col gap-5">
                            {order.products.map((orderItem: OrderItemType) => (
                                <OrderCard orderItem={orderItem} key={orderItem._id} />
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export const dynamic = "force-dynamic";

export default Orders;


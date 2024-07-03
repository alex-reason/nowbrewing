"use client"
import Image from "next/image";
import { FaRegTrashCan } from "react-icons/fa6";
import { useUser } from "@clerk/nextjs";

import Quantity from "@/components/Quantity";
import useCart from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";


const Cart = () => {
  const { user } = useUser()
  const cart = useCart();
  const router = useRouter()

  const subtotal = cart.cartItems.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0);
  const subtotalRounded = parseFloat(subtotal.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    fullName: user?.fullName,
  }

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          body: JSON.stringify({ cartItems: cart.cartItems, customer }),
        });
        const data = await res.json();
        window.location.href = data.url;
        console.log(data);
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row gap-20 py-16 px-10">
      <div className="w-100 lg:w-2/3 px-4 py-5">
        <h3 className="text-heading3-bold mb-4">Cart</h3>
        <hr className="my-6" />
        {
          cart.cartItems.length === 0
            ? <p>Your cart is empty.</p>
            : (
              <div>
                {cart.cartItems.map((cartItem) => (
                  <div
                    className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 m-2 p-6 hover:bg-blue-2 hover:cursor-pointer"
                    key={cartItem.item._id}
                  >
                    <div className="flex items-center">
                      <Image
                        src={cartItem.item.media[0]}
                        alt={cartItem.item.title}
                        height={100} width={100}
                        className="h-32 w-32 rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-3 ml-4">
                        <p className="text-base-medium uppercase">{cartItem.item.title}</p>
                        <p>
                          ${cartItem.item.price * cartItem.quantity}
                          <span className="font-light text-[.7rem]">  ({cartItem.item.size} ea) </span>
                        </p>

                      </div>
                    </div>

                    <Quantity
                      increaseQuantity={() => cart.increaseQuantity(cartItem.item._id)}
                      decreaseQuantity={() => cart.decreaseQuantity(cartItem.item._id)}
                      currQuantity={cartItem.quantity}
                    />
                    <FaRegTrashCan className="hover:text-red-2" onClick={() => cart.removeItem(cartItem.item._id)} />
                  </div>
                ))}
              </div>
            )
        }
      </div>


      <div className="w-100 lg:w-1/3 flex flex-col gap-8 bg-grey-2 rounded-lg px-4 py-5">

        <div>
          <h3 className="text-heading3-bold pb-6">Summary <span>
            {`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "items" : "item"})`}
          </span></h3>
          <hr className="mb-6" />
        </div>

        <div className="flex justify-between text-body-semibold">
          <p>Total:</p>
          <p>${subtotalRounded}</p>
        </div>
        <button
          className="mt-8 border border-blue-1 text-base-bold text-blue-1  hover:bg-blue-1 hover:text-white-1 px-2 py-4 rounded-sm"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
export const dynamic = "force-dynamic";

export default Cart;



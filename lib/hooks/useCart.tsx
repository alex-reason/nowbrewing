import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
    item: ProductType;
    quantity: number;
    size?: string;
}

interface CartStore {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (idToRemove: String) => void;
    increaseQuantity: (idToIncrease: String) => void;
    decreaseQuantity: (idToDecrease: String) => void;
    clearCart: () => void;
}

const useCart = create(persist<CartStore>(
    (set, get) => ({
        cartItems: [],
        increaseQuantity: (idToIncrease: String) => {
            const updatedCartItems = get().cartItems.map((cartItem) => (
                cartItem.item._id === idToIncrease
                    ? { ...cartItem, quantity: cartItem.quantity + 1 } // add quantity
                    : cartItem // else return item
            ));

            set({ cartItems: updatedCartItems })
        },
        addItem: (data: CartItem) => {
            const { item, quantity, size } = data;
            const currItems = get().cartItems // all the items already in cart
            const isInCart = currItems.find((cartItem) => cartItem.item._id === item._id);

            if (isInCart) {
                return toast.error("Item already in Cart", { icon: "❌" })
            }

            set({ cartItems: [...currItems, { item, quantity, size }] });

            toast.success("Item added to cart", { icon: "🛒" });
        },
        removeItem: (idToRemove: String) => {
            const updatedCartItems = get().cartItems.filter((cartItem) => cartItem.item._id !== idToRemove);

            set({ cartItems: updatedCartItems });

            toast.success("Item removed from cart")
        },

        decreaseQuantity: (idToDecrease: String) => {
            const updatedCartItems = get().cartItems.map((cartItem) => (
                cartItem.item._id === idToDecrease && cartItem.quantity > 1
                    ? { ...cartItem, quantity: cartItem.quantity - 1 } // add quantity
                    : cartItem // else return item
            ));

            set({ cartItems: updatedCartItems })
        },

        clearCart: () => { set({ cartItems: [] }) }
    }),
    {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    }
))


export default useCart;
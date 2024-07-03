"use client"
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { MdShoppingCart, MdOutlineMenu, MdOutlineSearch } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";


import useCart from "@/lib/hooks/useCart";

const Navbar = () => {
    const cart = useCart();
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useUser();

    const [dropdown, setDropDown] = useState(false);
    const [query, setQuery] = useState("");

    const linkClassName = "uppercase hover:text-blue-1"

    return (
        <nav className="sticky top-0 z-10 py-2 px-2 lg:px-10 flex justify-between items-center bg-white shadow-lg">
            <Link href="/">
                <Image src="/logo2.png" alt="now-brewing logo" width={40} height={20} className="w-auto h-auto" />
            </Link>

            <div className="lg:flex gap-6 text-base-bold hidden">
                <Link href="/" className={`${pathname === "/" ? "font-bold" : "font-medium"} ${linkClassName}`}>Now Brewing</Link>
                <Link href={user ? "/wishlist" : "/sign-in"} className={`${pathname === "/wishlist" ? "font-bold" : "font-medium"} ${linkClassName}`}>Saved</Link>
                <Link href={user ? "/orders" : "/sign-in"} className={`${pathname === "/orders" ? "font-bold" : "font-medium"} ${linkClassName}`}>Orders</Link>
            </div>

            <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
                <input
                    className="outline-none max-sm:max-w-[120px]"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    disabled={query === ""}
                    onClick={() => router.push(`/search/${query}`)}
                >
                    <MdOutlineSearch className="cursor-pointer h-4 w-4 hover:text-red-1" />
                </button>
            </div>

            <div className="flex items-center gap-3 relative">
                <MdOutlineMenu
                    className="cursor-pointer hover:text-blue-1 text-[1.5rem] lg:hidden"
                    onClick={() => { setDropDown(!dropdown) }}
                />
                <Link href="/cart" className="flex items-end px-2 py-1 hover:text-blue-1">
                    <MdShoppingCart className="text-[1.5rem]" />
                    <p className="text-base-medium  text-[0.8rem]">
                        {cart.cartItems.length}
                    </p>
                </Link>

                {dropdown && (
                    <div className="absolute flex flex-col bg-white gap-4 p-3 rounded-lg border text-base-bold top-12 right-45 lg:hidden">
                        <Link href={user ? "/wishlist" : "/sign-in"} className="uppercase hover:text-blue-1">Saved</Link>
                        <Link href={user ? "/orders" : "/sign-in"} className="uppercase hover:text-blue-1">Orders</Link>
                        <Link href="/cart" className="uppercase hover:text-blue-1">
                            <p> Cart ({cart.cartItems.length})</p>
                        </Link>
                    </div>
                )}

                {user ? <UserButton afterSignOutUrl="/" /> : <Link href="/sign-in">Sign In</Link>}
            </div>
        </nav>
    )
}

export default Navbar
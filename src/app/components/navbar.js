"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react'

export default function Navbar() {
    const location = usePathname();

    return (
        <div className="flex w-full">
            <Link className={`mx-2 p-2 my-1 rounded-lg text-white hover:bg-blue-600 ${location === "/getRandom" ? "bg-blue-700" : "bg-blue-500"}`}
                href={"/getRandom"}>
                See Random NFts
            </Link>

            <Link className={`mx-2 p-2 my-1 rounded-lg text-white hover:bg-blue-600 ${location === "/getByID" ? "bg-blue-700" : "bg-blue-500"}`}
                href={"/getByID"}>
                Get NFT By TokenID
            </Link>
        </div>

    )
}

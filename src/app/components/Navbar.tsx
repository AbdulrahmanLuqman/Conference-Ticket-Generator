import Image from "next/image"

import Logo from "/public/assets/logo.svg"
import LogoName from "/public/assets/logo-name.svg"
// import Arrow from "/public/assets/arrow-left.svg"
import { ArrowLeft } from "./Icons"

export default function Navbar(){
    return (
        <header className="mt-5 py-3 px-4 w-[1200px] max-[1200px]:w-full border border-[#197686] rounded-[24px] flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <div className="py-[6px] px-2 rounded-xl bg-[#052F35] border border-[#0E464F]">
                    <Image src={Logo} alt="Logo" />
                </div>
                
                <Image src={LogoName} alt="Logo Name" className="max-[310px]:hidden" />
            </div>
            <nav className="max-[720px]:hidden">
                <ul className="flex gap-4 items-center">
                    <li className="text-lg">Events</li>
                    <li className="text-lg opacity-50">My Tickets</li>
                    <li className="text-lg opacity-50">About Project</li>
                </ul>
            </nav>
            <button className="flex gap-2 items-center py-4 px-6 max-[346px]:py-2 max-[346px]:px-3 bg-white hover:text-[#f5f5f5] rounded-xl">
                <span className="text-black max-[318px]:text-sm">MY TICKETS</span>
                <ArrowLeft />
            </button>
        </header>
    )
}
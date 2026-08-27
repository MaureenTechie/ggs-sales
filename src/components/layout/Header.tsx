"use client";

import {
    Bell,
    Search,
    UserCircle,
} from "lucide-react";

export default function Header(){
    return(
        <header className="fixed left-64 right-0 top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-8">

            {/* Search */}
            <div className="flex w-96 items-center gap-3 rounded-xl bg-gray-100 px-4 py-2.5">
                <Search size={18} className="text-gray-400" />

                <input 
                type="text"
                placeholder="Search invoices, customers..."
                className="w-full bg-transparent text-sm outline-none"
                />
            </div>

            {/* Right */}
            <div className="flex items-center gap-6">
                <button className="relative">
                    <Bell size={21} className="text-gray-600" />

                    <span className="absolute-right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                </button>

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCFCE7] text-[#14532D]">
                        <UserCircle size{25} />
                    </div>

                    <div>
                        <p className="text-sm font-semibold">
                            Maureen
                        </p>

                        <p className="text-xs text-gray-500">
                            Administrator
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Package,
    FileText,
    Receipt,
    ScrollText,
    Truck,
    ClipboardList,
    BarChart3,
    Settings,
    LogOut,
    Leaf,
    ChevronRight,
} from "lucide-react";

const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Customers",
        href: "/customers",
        icon: Users,
    },
    {
        name: "Products",
        href: "/products",
        icon: Package,
    },
    {
        name: "Quotations",
        href: "/quotations",
        icon: FileText,
    },
    {
        name: "Invoices",
        href: "/invoices",
        icon: Receipt,
    },
    {
        name: "Receipts",
        href: "/receipts",
        icon: ScrollText,
    },
    {
        name: "Credit Notes",
        href: "/credit-notes",
        icon: ClipboardList,
    },
    {
        name: "Delivery Notes",
        href: "/delivery-notes",
        icon: Truck,
    },
    {
        name: "Packing Slips",
        href: "/packing-slips",
        icon: ClipboardList,
    },
    {
        name: "Reports",
        href: "/reports",
        icon: BarChart3,
    },
];

export default function Sidebar(){
    const pathname = usePathname();

    return(
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#064E2A] text-white">

            {/* Logo */}
            <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22C55E] shadow-sm">
                <Leaf size={24} />
            </div>

            <div>
                <h1 className="font-bold tracking-wide">
                    GEODA
                </h1>

                <p className="text-xs text-green-200">
                    Green Suppliers 
                </p>
            </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-6">
                {navigation.map((item) => {
                    const Icon = item.icon;

                    const active = pathname ===item.href;

                    return(
                        <Link key={item.name} href={item.href} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                            active
                            ? "bg-white text-[#14532D]"
                            : "text-green-50 hover:bg-white/10"
                        }`}
                        >
                            <Icon size={19} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="border-t border-white/10 p-3">
            <Link href="/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-50 hover:bg-white/10">
            <Settings size={19} />
            Settings
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-green-100 hover:bg-white/10">
            <LogOut size={19} />
            Logout
            </button>
            </div>
        </aside>
    );
}
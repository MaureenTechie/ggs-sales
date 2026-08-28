"use client";

import Image from "next/image";
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#064E2A] text-white">

      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">

      {/* Logo box - Square */}
        <div className="flex h-12 w-12  items-center justify-center bg-white p-1 shadow-sm">
          <Image 
          src="/Geoda-logo.jpg"
          alt="Geoda Green Suppliers Limited"
          width={40}
          height={40}
          className="h-full w-full object-contain p-1"
          />
        </div>

        {/* Company name */}
        <div>
          <h1 className="text-lg font-bold tracking-wide">
            GEODA
          </h1>

          <p className="text-xs text-green-200">
            Green Suppliers
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-green-300">
          Main Menu
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#22C55E] text-white shadow-sm"
                    : "text-green-50 hover:bg-white/10"
                }`}
              >
                <Icon
                  size={19}
                  className={
                    active
                      ? "text-white"
                      : "text-green-200 group-hover:text-white"
                  }
                />

                <span className="flex-1">
                  {item.name}
                </span>

                {active && (
                  <ChevronRight size={15} />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Company card */}
      <div className="px-3 pb-3">
        <div className="rounded-2xl bg-[#0A6938] p-3">
          <div className="flex items-center gap-3">

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">
                Geoda Green Suppliers
              </p>

              <p className="text-[11px] text-green-200">
                Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-[#14532D]">
            <span className="font-bold">
              M
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              Maureen
            </p>

            <p className="text-xs text-green-200">
              Administrator
            </p>
          </div>
        </div>

        <Link
          href="/settings"
          className="mt-3 flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-green-100 hover:bg-white/10"
        >
          <Settings size={17} />
          Settings
        </Link>

        <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-green-100 hover:bg-white/10">
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
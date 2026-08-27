"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  UserCircle,
  X,
  FileText,
  Receipt,
  Users,
  Package,
} from "lucide-react";

const searchResults = [
  {
    type: "Invoice",
    number: "INV-00245",
    name: "ABC Farm Limited",
    icon: Receipt,
  },
  {
    type: "Invoice",
    number: "INV-00244",
    name: "XYZ Limited",
    icon: Receipt,
  },
  {
    type: "Customer",
    number: "",
    name: "David Fresh Farms",
    icon: Users,
  },
  {
    type: "Product",
    number: "",
    name: "Greenhouse Film 200 Micron",
    icon: Package,
  },
  {
    type: "Quotation",
    number: "QT-00045",
    name: "ABC Farm Limited",
    icon: FileText,
  },
];

export default function Header() {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const filteredResults =
    search.length > 0
      ? searchResults.filter((item) =>
          `${item.number} ${item.name} ${item.type}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : [];

  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-8">

      {/* Search */}
      <div className="relative w-[420px]">

        <div
          className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 transition ${
            focused
              ? "border-[#22C55E] ring-2 ring-[#DCFCE7]"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Search invoices, customers, products..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={17} />
            </button>
          )}

          <kbd className="hidden rounded-md border bg-white px-2 py-1 text-[10px] text-gray-400 md:block">
            Ctrl K
          </kbd>
        </div>

        {/* Search results */}
        {focused && search && (
          <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-xl border bg-white shadow-xl">

            {filteredResults.length > 0 ? (
              <div className="py-2">

                <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Search Results
                </p>

                {filteredResults.map((result, index) => {
                  const Icon = result.icon;

                  return (
                    <button
                      key={index}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#F0FDF4]"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#14532D]">
                        <Icon size={17} />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {result.number || result.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {result.type}
                          {result.number && ` • ${result.name}`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-5 py-8 text-center">
                <Search
                  size={25}
                  className="mx-auto mb-2 text-gray-300"
                />

                <p className="text-sm font-medium text-gray-600">
                  No results found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Try another search term
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[#F0FDF4]">
          <Bell
            size={20}
            className="text-gray-600"
          />

          <span className="absolute right-2 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#22C55E] px-1 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200" />

        {/* User */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCFCE7] text-[#14532D]">
            <UserCircle size={26} />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
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
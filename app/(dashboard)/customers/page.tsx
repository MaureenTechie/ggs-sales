"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Building2,
  User,
  Users,
} from "lucide-react";

import {Customer, defaultCustomers} from "@src/lib/customers";

const formatCurrency = (amount: number) =>
  `KES ${amount.toLocaleString("en-KE")}`;

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Customers");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const deleteCustomer = (customer: Customer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${customer.name}?`
    );

    if (!confirmed) return;

    const updatedCustomers = customers.filter(
      (item) => item.id !== customer.id
    );

    setCustomers(updatedCustomers);

    localStorage.setItem(
      "ggs-customers",
      JSON.stringify(updatedCustomers)
    );

    setOpenMenu(null);
  }

  const [customers, setCustomers] = useState<Customer[]>(() => {
    if (typeof window === "undefined") {
      return defaultCustomers;
    }

    const saved = localStorage.getItem("ggs-customers");

    return saved
    ? JSON.parse(saved)
    : defaultCustomers;
});

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.toLowerCase().includes(search.toLowerCase()) ||
        customer.kraPin.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All Customers" ||
        (filter === "Businesses" && customer.type === "Business") ||
        (filter === "Individuals" && customer.type === "Individual") ||
        (filter === "Outstanding" && customer.balance > 0);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const totalCustomers = customers.length;
  const businessCustomers = customers.filter(
    (customer) => customer.type === "Business"
  ).length;

  const outstanding = customers.reduce(
    (total, customer) => total + customer.balance,
    0
  );

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#16A34A]">
            Customers
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#14532D]">
            Customer Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your customers and their transactions.
          </p>
        </div>

        <button
          onClick={() => {
            window.location.href = "/customers/new";
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#146B3A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0F5A30]"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          icon={<Users size={21} />}
          title="Total Customers"
          value={totalCustomers.toString()}
          description="All registered customers"
        />

        <StatCard
          icon={<Building2 size={21} />}
          title="Business Customers"
          value={businessCustomers.toString()}
          description="Companies & organizations"
        />

        <StatCard
          icon={<span className="text-lg font-bold">KES</span>}
          title="Outstanding Balance"
          value={formatCurrency(outstanding)}
          description="Total amount due"
        />
      </div>

      {/* Customer table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">
              All Customers
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {filteredCustomers.length} customer
              {filteredCustomers.length !== 1 ? "s" : ""} displayed
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customers..."
                className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none transition focus:border-[#22C55E] focus:bg-white focus:ring-2 focus:ring-[#DCFCE7] sm:w-64"
              />
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none focus:border-[#22C55E]"
            >
              <option>All Customers</option>
              <option>Businesses</option>
              <option>Individuals</option>
              <option>Outstanding</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F0FDF4] text-xs uppercase tracking-wide text-[#14532D]">
                <th className="px-6 py-4 font-semibold">
                  Customer
                </th>

                <th className="px-6 py-4 font-semibold">
                  Contact
                </th>

                <th className="px-6 py-4 font-semibold">
                  KRA PIN
                </th>

                <th className="px-6 py-4 font-semibold">
                  Location
                </th>

                <th className="px-6 py-4 font-semibold">
                  Balance
                </th>

                <th className="px-6 py-4 font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="group transition hover:bg-[#F7FCF8]"
                >
                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#15803D]">
                        {customer.type === "Business" ? (
                          <Building2 size={18} />
                        ) : (
                          <User size={18} />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {customer.name}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-400">
                          {customer.id} · {customer.type}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">
                      {customer.phone}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {customer.email}
                    </p>
                  </td>

                  {/* KRA */}
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-gray-600">
                      {customer.kraPin}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.location}
                  </td>

                  {/* Balance */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-semibold ${
                        customer.balance > 0
                          ? "text-[#B45309]"
                          : "text-[#15803D]"
                      }`}
                    >
                      {formatCurrency(customer.balance)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === "Paid"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#FEF3C7] text-[#B45309]"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="relative px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === customer.id
                            ? null
                            : customer.id
                        )
                      }
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                      <MoreHorizontal size={19} />
                    </button>

                    {openMenu === customer.id && (
                      <div className="absolute right-6 top-12 z-20 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 text-left shadow-xl">
                        <Link
                        href={`/customers/${customer.id}`}
                        onClick={()=> setOpenMenu(null)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition hover:bg-[#FOFDF4] hover:text-[#14532D]"
                        >
                          <Eye size={16} />
                          View Customer
                        </Link>

                        <Link
                        href={`/customers/${customer.id}/edit`}
                        onClick={() => setOpenMenu(null)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition hover:bg-[#F0FDF4] hover:text-[#14532D]"
                        >
                          <Pencil size={16} />
                          Edit Customer
                        </Link>

                        <button
                        onClick={() => deleteCustomer(customer)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Delete Customer
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredCustomers.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F0FDF4] text-[#15803D]">
              <Search size={20} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-800">
              No customers found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filter.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredCustomers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {customers.length}
            </span>{" "}
            customers
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#15803D]">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-xl font-bold text-[#14532D]">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-600 hover:bg-[#F0FDF4] hover:text-[#14532D]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
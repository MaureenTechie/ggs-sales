"use client";

import Link from "next/link";
import { ArrowLeft, Building2, Pencil, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Customer,
  defaultCustomers,
} from "@/src/lib/customers";

export default function CustomerDetailsPage() {
  const params = useParams();

  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ggs-customers");

    const customers: Customer[] = saved
      ? JSON.parse(saved)
      : defaultCustomers;

    const found = customers.find(
      (item) => item.id === params.id
    );

    setCustomer(found || null);
  }, [params.id]);

  if (!customer) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Customer not found
        </h2>

        <Link
          href="/customers"
          className="mt-4 inline-flex text-sm font-medium text-[#15803D]"
        >
          ← Back to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/customers"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <p className="text-sm font-medium text-[#16A34A]">
              Customers
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#14532D]">
              {customer.name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {customer.id}
            </p>
          </div>
        </div>

        <Link
          href={`/customers/${customer.id}/edit`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#146B3A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0F5A30]"
        >
          <Pencil size={17} />
          Edit Customer
        </Link>
      </div>

      {/* Customer overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DCFCE7] text-[#15803D]">
              {customer.type === "Business" ? (
                <Building2 size={26} />
              ) : (
                <User size={26} />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {customer.name}
              </h2>

              <p className="text-sm text-gray-500">
                {customer.type}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Detail label="Phone Number" value={customer.phone} />
            <Detail label="Email Address" value={customer.email} />
            <Detail label="KRA PIN" value={customer.kraPin} />
            <Detail label="Location" value={customer.location} />
          </div>
        </div>

        {/* Balance */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Outstanding Balance
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              customer.balance > 0
                ? "text-[#B45309]"
                : "text-[#15803D]"
            }`}
          >
            KES {customer.balance.toLocaleString("en-KE")}
          </p>

          <span
            className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              customer.balance > 0
                ? "bg-[#FEF3C7] text-[#B45309]"
                : "bg-[#DCFCE7] text-[#15803D]"
            }`}
          >
            {customer.status}
          </span>
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="font-semibold text-gray-800">
            Customer Transactions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Invoices, quotations, receipts and other documents
            will appear here.
          </p>
        </div>

        <div className="px-6 py-12 text-center">
          <p className="text-sm text-gray-500">
            No transactions available yet.
          </p>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-700">
        {value || "—"}
      </p>
    </div>
  );
}
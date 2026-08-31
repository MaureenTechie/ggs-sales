"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  Customer,
  defaultCustomers,
} from "@/src/lib/customers";

export default function EditCustomerPage() {
  const params = useParams();
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(
    null
  );

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
      <div className="p-10 text-center">
        <h2 className="font-semibold">Customer not found</h2>

        <Link
          href="/customers"
          className="mt-4 inline-block text-[#15803D]"
        >
          Back to Customers
        </Link>
      </div>
    );
  }

  const updateField = (
    field: keyof Customer,
    value: string | number
  ) => {
    setCustomer({
      ...customer,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const saved = localStorage.getItem("ggs-customers");

    const customers: Customer[] = saved
      ? JSON.parse(saved)
      : defaultCustomers;

    const updated = customers.map((item) =>
      item.id === customer.id ? customer : item
    );

    localStorage.setItem(
      "ggs-customers",
      JSON.stringify(updated)
    );

    router.push(`/customers/${customer.id}`);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={`/customers/${customer.id}`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
        >
          <ArrowLeft size={19} />
        </Link>

        <div>
          <p className="text-sm font-medium text-[#16A34A]">
            Customers
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#14532D]">
            Edit Customer
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update {customer.name}'s information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="font-semibold text-gray-800">
              Customer Information
            </h2>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">
            <Field
              label={
                customer.type === "Business"
                  ? "Business Name"
                  : "Customer Name"
              }
              value={customer.name}
              onChange={(value) =>
                updateField("name", value)
              }
            />

            <Field
              label="Phone Number"
              value={customer.phone}
              onChange={(value) =>
                updateField("phone", value)
              }
            />

            <Field
              label="Email Address"
              value={customer.email}
              onChange={(value) =>
                updateField("email", value)
              }
              type="email"
            />

            <Field
              label="KRA PIN"
              value={customer.kraPin}
              onChange={(value) =>
                updateField("kraPin", value)
              }
            />

            <Field
              label="Location"
              value={customer.location}
              onChange={(value) =>
                updateField("location", value)
              }
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Customer Type
              </label>

              <select
                value={customer.type}
                onChange={(e) =>
                  updateField(
                    "type",
                    e.target.value as Customer["type"]
                  )
                }
                className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#DCFCE7]"
              >
                <option>Business</option>
                <option>Individual</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Link
            href={`/customers/${customer.id}`}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#146B3A] px-6 text-sm font-semibold text-white hover:bg-[#0F5A30]"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#DCFCE7]"
      />
    </div>
  );
}
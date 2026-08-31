"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  User,
  Save,
  X,
} from "lucide-react";

export default function NewCustomerPage() {
  const [customerType, setCustomerType] = useState<
    "Business" | "Individual"
  >("Business");

  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    kraPin: "",
    address: "",
    city: "",
    county: "",
    paymentTerms: "Due on Receipt",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      customerType,
      ...formData,
    });

    alert("Customer saved successfully!");
  };

  const handleCancel = () => {
    window.location.href = "/customers";
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => (window.location.href = "/customers")}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 hover:text-[#14532D]"
        >
          <ArrowLeft size={19} />
        </button>

        <div>
          <p className="text-sm font-medium text-[#16A34A]">
            Customers
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#14532D]">
            Add New Customer
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add customer details for quotations, invoices and receipts.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer type */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="font-semibold text-gray-800">
              Customer Type
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select whether this customer is a business or an individual.
            </p>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setCustomerType("Business")}
              className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                customerType === "Business"
                  ? "border-[#22C55E] bg-[#F0FDF4] ring-2 ring-[#DCFCE7]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  customerType === "Business"
                    ? "bg-[#DCFCE7] text-[#15803D]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Building2 size={21} />
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  Business
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Company, farm, organization or institution
                </p>
              </div>

              {customerType === "Business" && (
                <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#16A34A]">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => setCustomerType("Individual")}
              className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                customerType === "Individual"
                  ? "border-[#22C55E] bg-[#F0FDF4] ring-2 ring-[#DCFCE7]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  customerType === "Individual"
                    ? "bg-[#DCFCE7] text-[#15803D]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <User size={21} />
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  Individual
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Personal customer
                </p>
              </div>

              {customerType === "Individual" && (
                <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#16A34A]">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              )}
            </button>
          </div>
        </section>

        {/* Basic information */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="font-semibold text-gray-800">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the customer's main identification details.
            </p>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">
            <FormField
              label={
                customerType === "Business"
                  ? "Business Name"
                  : "Customer Name"
              }
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={
                customerType === "Business"
                  ? "e.g. David Fresh Farms"
                  : "e.g. John Mwangi"
              }
              required
            />

            <FormField
              label="Contact Person"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="e.g. David Kamau"
              required={customerType === "Business"}
            />

            <FormField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 0712 345 678"
              required
            />

            <FormField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. accounts@company.co.ke"
              type="email"
            />

            <FormField
              label="KRA PIN"
              name="kraPin"
              value={formData.kraPin}
              onChange={handleChange}
              placeholder="e.g. P051234567A"
            />
          </div>
        </section>

        {/* Address */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="font-semibold text-gray-800">
              Address & Location
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Customer location and delivery information.
            </p>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <FormField
                label="Physical Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. P.O. Box 12345, Nairobi"
              />
            </div>

            <FormField
              label="City / Town"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Nairobi"
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                County
              </label>

              <select
                name="county"
                value={formData.county}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-[#DCFCE7]"
              >
                <option value="">Select county</option>
                <option>Nairobi</option>
                <option>Kiambu</option>
                <option>Machakos</option>
                <option>Kajiado</option>
                <option>Nakuru</option>
                <option>Murang'a</option>
                <option>Nyeri</option>
                <option>Kirinyaga</option>
                <option>Meru</option>
                <option>Embu</option>
                <option>Makueni</option>
                <option>Kitui</option>
                <option>Kisumu</option>
                <option>Kakamega</option>
                <option>Uasin Gishu</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="font-semibold text-gray-800">
              Payment Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Set the default payment terms for this customer.
            </p>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Payment Terms
              </label>

              <select
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-[#DCFCE7]"
              >
                <option>Due on Receipt</option>
                <option>7 Days</option>
                <option>14 Days</option>
                <option>30 Days</option>
                <option>60 Days</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="font-semibold text-gray-800">
              Additional Notes
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Optional information about this customer.
            </p>
          </div>

          <div className="p-6">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Add any additional customer information..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#22C55E] focus:ring-2 focus:ring-[#DCFCE7]"
            />
          </div>
        </section>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            <X size={17} />
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#146B3A] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0F5A30]"
          >
            <Save size={17} />
            Save Customer
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#22C55E] focus:ring-2 focus:ring-[#DCFCE7]"
      />
    </div>
  );
}
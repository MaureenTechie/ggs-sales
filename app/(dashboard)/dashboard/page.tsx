import SalesOverview from "./SalesOverview";

import {
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    FileText,
    Receipt,
    Users,
    Package,
  } from "lucide-react";
  
  const stats = [
    {
      title: "Total Sales",
      value: "KES 3,971,703",
      change: "+12.5%",
      positive: true,
    },
    {
      title: "Paid Invoices",
      value: "KES 2,801,200",
      change: "+8.2%",
      positive: true,
    },
    {
      title: "Outstanding",
      value: "KES 1,170,503",
      change: "-4.3%",
      positive: true,
    },
    {
      title: "Invoices",
      value: "245",
      change: "+18",
      positive: true,
    },
  ];
  
  const recentInvoices = [
    {
      number: "INV-00245",
      customer: "ABC Farm Limited",
      date: "25 Aug 2026",
      amount: "KES 145,000",
      status: "Paid",
    },
    {
      number: "INV-00244",
      customer: "XYZ Limited",
      date: "25 Aug 2026",
      amount: "KES 82,500",
      status: "Pending",
    },
    {
      number: "INV-00243",
      customer: "David Fresh Farms",
      date: "24 Aug 2026",
      amount: "KES 230,000",
      status: "Partial",
    },
    {
      number: "INV-00242",
      customer: "Kopia Kenya",
      date: "24 Aug 2026",
      amount: "KES 96,500",
      status: "Paid",
    },
  ];
  
  export default function DashboardPage() {
    return (
      <div className="space-y-8">
  
        {/* Heading */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#22C55E]">
              Overview
            </p>
  
            <h1 className="mt-1 text-2xl font-bold text-[#14532D]">
              Good morning, Maureen 👋
            </h1>
  
            <p className="mt-1 text-sm text-gray-500">
              Here's what's happening with Geoda today.
            </p>
          </div>
  
          <button className="flex items-center gap-2 rounded-xl bg-[#14532D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#052E16]">
            <Plus size={18} />
            New Invoice
          </button>
        </div>
  
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-500">
                {stat.title}
              </p>
  
              <div className="mt-3 flex items-end justify-between">
                <h2 className="text-2xl font-bold text-[#14532D]">
                  {stat.value}
                </h2>
  
                <span className="flex items-center gap-1 text-xs font-semibold text-[#16A34A]">
                  <ArrowUpRight size={14} />
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
  
        {/* Quick Actions */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Quick Actions
          </h2>
  
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
            <QuickAction
              icon={FileText}
              title="New Quotation"
              href="/quotations/new"
            />
  
            <QuickAction
              icon={Receipt}
              title="New Invoice"
              href="/invoices/new"
            />

            <QuickAction 
              icon={Receipt}
              title="New Receipt"
              href="/receipts/new"
            />
  
            <QuickAction
              icon={Users}
              title="Add Customer"
              href="/customers/new"
            />
  
            <QuickAction
              icon={Package}
              title="Add Product"
              href="/products/new"
            />
          </div>
        </section>
  
        {/* Sales & Recent invoices */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <SalesOverview />

          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-6 py-5">

              <div>
                <h2 className="font-semibold text-gray-800">
                  Recent Invoices
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Your latest sales invoices
                </p>
              </div>

              <a 
              href="/invoices"
              className="text-sm font-semibold text-[#14532D] hover:underline"
              >
                View all
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F0FDF4] text-xs uppercase text -[#14532D]">
                  <tr>
                    <th className="px-6 py-4">
                      Invoice
                    </th>

                    <th className="px-6 py-4">
                      Customer
                    </th>

                    <th className="px-6 py-4">
                      Amount
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {recentInvoices.map((invoice) => (
                    <tr
                    key={invoice.number}
                    className="transition hover:bg-[#F0FDF4]"
                    >
                      <td className="px-6 py-4 font-semibold text-[#14532D]">
                        {invoice.number}
                      </td>

                      <td className="px-6 py-4">
                        {invoice.customer}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        {invoice.amount}
                      </td>

                      <td className="px-6 py-4">
                        <Status status={invoice.status} />
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

            <div className="border-t px-6 py-4">
              <a
              href="/invoices"
              className="text-sm font-semibold text-[#14532D]"
              >
                View all invoices →
              </a>
            </div>

          </section>

        </div>
  
      </div>
    );
  }
  
  function QuickAction({ icon: Icon, title, href }) {
    return (
      <a
        href={href}
        className="group flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#22C55E] hover:bg-[#F0FDF4]"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#14532D] transition group-hover:bg-[#14532D] group-hover:text-white">
          <Icon size={20} />
        </div>
  
        <span className="text-sm font-semibold text-gray-700">
          {title}
        </span>
      </a>
    );
  }
  
  function Status({ status }) {
    const styles = {
      Paid: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Partial: "bg-blue-100 text-blue-700",
    };
  
    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
      >
        {status}
      </span>
    );
  }
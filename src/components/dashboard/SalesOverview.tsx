"use client";

import{
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    {date: "1 Aug", sales: 85000},
    {date: "3 Aug", sales: 120000},
    {date: "5 Aug", sales: 160000},
    {date: "7 Aug", sales: 280000},
    {date: "9 Aug", sales: 310000},
    {date: "11 Aug",sales: 520000},
    {date: "13 Aug", sales: 560000},
    {date: "15 Aug", sales: 640000},
    {date: "17 Aug", sales: 580000},
    {date: "19 Aug", sales: 630000},
    {date: "21 Aug", sales: 720000},
    {date: "23 Aug", sales: 880000},
    {date: "25 Aug", sales: 820000},
    {date: "27 Aug", sales: 900000},
    {date: "29 Aug", sales: 930000},
    {date: "31 Aug", sales: 970000},
];

export default function SalesOverview(){
    return(
        <div className="rounded-2xl border bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Sales Overview
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                        Track your sales performance
                    </p>
                </div>

                <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-shadow-gray-600 outline-none focus:border-[#22C55E]">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>This Year</option>
                </select>
            </div>

            {/* Chart */}
            <div className="h-[330px] w-full px-4 pb-2 pt-6">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{top: 10, right: 20, left: 0, bottom: 0,}}>
                    <defs>
                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop
                            offset="0%"
                            stopColor="#22C55E"
                            stopOpacity={0.25}
                            />

                            <stop 
                            offset="100%"
                            stopColor="#22C55E"
                            stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid 
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                    />

                    <XAxis 
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fontSize:11,
                        fill: "#9CA3AF",
                    }}
                    />

                    <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fontSize: 11,
                        fill: "#9CA3AF",
                    }}
                    tickFormatter={(value) =>
                        `${value / 1000}K`
                    }
                    />

                    <Tooltip 
                    formatter={(value) => [
                        `KES ${Number(value).toLocaleString()}`,
                        "Sales",
                    ]}
                    contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #E5E7EB",
                        boxShadow:
                        "0 10px 25px rgba(0, 0, 0, 0, 0.08)",
                    }}
                    />

                    <Area 
                    type="monotone"
                    dataKey="sales"
                    stroke="#15803D"
                    strokeWidth={3}
                    fill="url(#salesGradient)"
                    />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Footer stats */}
            <div className="grid grid-cols-2 border-t">
                <div className="px-6 py-5">
                    <p className="text-xs text-gray-500">
                        Total Sales
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#14532D]">
                        KES 3,971,703
                    </p>
                </div>

                <div className="border-l px-6 py-5">
                    <p className="text-xs text-gray-500">
                        Average Daily Sales
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#14532D]">
                        KES 128,120
                    </p>
                </div>

            </div>
        </div>
    );
}
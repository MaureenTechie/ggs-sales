import Sidebar from "@/src/components/layout/Sidebar";
import Header from "@/src/components/layout/Header";

export default function DashboardLayout({children}) {
    return(
        <div className="min-h-screen bg-[#F7FAF8]">
            <Sidebar />

            <Header />

            <main className="ml-64 pt-20">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
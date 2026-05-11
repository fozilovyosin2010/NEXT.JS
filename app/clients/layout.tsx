import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}

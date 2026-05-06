import Card from "@/components/Card";
import { Banknote, Code, Hospital } from "lucide-react";
import React from "react";

const page = () => {
  const cardList: { id: number, des: string, icon: React.ReactNode, title: string, link: string, color: "indigo" | "blue" | "slate" }[] = [
    {
      id: 1,
      des: "Software engineering, data science, and cloud architecture roles.",
      icon: <Code size={28} />,
      title: "Technology",
      link: "Browse 1.2k+ jobs",
      color: "indigo",
    },
    {
      id: 2,
      des: "Specialized medical, nursing, and healthcare management positions.",
      icon: <Hospital size={28} />,
      title: "Healthcare",
      link: "Browse 850+ jobs",
      color: "blue",
    },
    {
      id: 3,
      des: "Investment banking, fintech, and accounting opportunities.",
      icon: <Banknote size={28} />,
      title: "Finance",
      link: "Browse 640+ jobs",
      color: "slate",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-950 tracking-tight leading-tight">
              Featured Job Categories
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl">
              Explore opportunities across high-growth industries.
            </p>
          </div>
          <a 
            href="#" 
            className="text-indigo-700 font-bold text-sm tracking-widest uppercase hover:text-indigo-900 transition-all duration-300 border-b-2 border-indigo-700 hover:border-indigo-900 pb-1 whitespace-nowrap"
          >
            View All Categories
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardList.map((e) => (
            <Card key={e.id} {...e} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;

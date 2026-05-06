import React from "react";

interface ICard {
  icon: React.ReactNode;
  title: string;
  des: string;
  link: string;
  color?: "indigo" | "blue" | "slate";
}

const Card = ({ icon, title, des, link, color = "indigo" }: ICard) => {
  const colorClasses = {
    indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600",
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
    slate: "bg-slate-100 text-slate-600 group-hover:bg-slate-600",
  };

  return (
    <div className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col items-start gap-6">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:text-white group-hover:scale-110 ${colorClasses[color]}`}>
        {icon}
      </div>
      
      <div className="space-y-3">
        <h3 className="font-bold text-2xl text-gray-900 tracking-tight">{title}</h3>
        <p className="text-gray-500 text-[16px] leading-relaxed">
          {des}
        </p>
      </div>

      <div className="mt-4">
        <div className="text-indigo-700 font-bold text-sm flex items-center gap-2 group/link">
          {link}
          <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-2">→</span>
        </div>
      </div>
    </div>
  );
};

export default Card;



import React from "react";
import { Bookmark, MapPin, Briefcase, DollarSign } from "lucide-react";

interface IJob {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  logo: React.ReactNode;
}

const JobCard = ({ title, company, location, type, salary, logo }: IJob) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
          {logo}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-indigo-950 tracking-tight">{title}</h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500 text-sm">
            <span className="font-semibold text-gray-700">{company}</span>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {location}
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
              {type}
            </span>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
              <DollarSign size={12} />
              {salary}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors duration-300">
          Apply Now
        </button>
        <button className="p-3 border border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-600 rounded-lg transition-all duration-300">
          <Bookmark size={20} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;

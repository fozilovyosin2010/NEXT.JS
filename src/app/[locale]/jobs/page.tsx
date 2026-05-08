import React from "react";
import { 
  Search, 
  Cpu, 
  LineChart, 
  GraduationCap, 
  Terminal,
  Filter,
  ChevronDown
} from "lucide-react";
import JobCard from "@/components/JobCard";

const JobsPage = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior UX Researcher",
      company: "Stellar Systems",
      location: "New York, NY (Hybrid)",
      type: "Full-time",
      salary: "110k - 145k",
      logo: <Cpu size={28} />,
    },
    {
      id: 2,
      title: "Lead Data Scientist",
      company: "Quantum Metrics",
      location: "Remote",
      type: "Full-time",
      salary: "160k - 190k",
      logo: <LineChart size={28} />,
    },
    {
      id: 3,
      title: "Instructional Designer",
      company: "Lumina EdTech",
      location: "Austin, TX",
      type: "Contract",
      salary: "85k - 105k",
      logo: <GraduationCap size={28} />,
    },
    {
      id: 4,
      title: "Full Stack Engineer",
      company: "CloudForge",
      location: "Remote",
      type: "Full-time",
      salary: "130k - 170k",
      logo: <Terminal size={28} />,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header and Search */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-950 tracking-tight">
            Find your next role
          </h1>
          
          <div className="relative max-w-2xl group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
              <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Search by job title, company, or keywords"
              className="w-full py-5 pl-14 pr-6 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-10">
            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Filter size={14} />
                Job Type
              </h3>
              <div className="space-y-3">
                {["Full-time", "Contract", "Remote"].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked={type === "Full-time"}
                      className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-colors" 
                    />
                    <span className="text-gray-600 font-medium group-hover:text-indigo-900 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Experience</h3>
              <div className="space-y-3">
                {["Entry Level", "Mid-Senior", "Executive"].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="experience"
                      defaultChecked={level === "Mid-Senior"}
                      className="w-5 h-5 border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-colors" 
                    />
                    <span className="text-gray-600 font-medium group-hover:text-indigo-900 transition-colors">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Salary Range</h3>
              <div className="relative group">
                <select className="w-full p-4 bg-white border border-gray-200 rounded-xl shadow-sm appearance-none outline-none focus:border-indigo-600 transition-all font-medium text-gray-700">
                  <option>$80k - $120k</option>
                  <option>$120k - $160k</option>
                  <option>$160k - $200k</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-indigo-600 transition-colors">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-6">
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobsPage;


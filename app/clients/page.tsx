import { Search, UserPlus } from "lucide-react";

const ClientsPage = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <div className="border flex items-center p-2 rounded-md gap-2">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
        <button className="p-[8px_15px] rounded-md bg-[#4F46E5] text-[#fff] flex gap-1 text-xs">
          <UserPlus size={14} />
          <span>Add Client</span>
        </button>
      </div>
    </div>
  );
};

export default ClientsPage;

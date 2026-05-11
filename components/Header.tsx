import { Bell, CircleUser, Menu } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between p-[10px_20px] border-b">
      <div className="flex gap-3">
        <Menu className="text-[#4F46E5]" />
        <div className="text-[#4F46E5]">Clients</div>
      </div>
      <div className="flex gap-3">
        <Bell />
        <CircleUser />
      </div>
    </div>
  );
};

export default Header;

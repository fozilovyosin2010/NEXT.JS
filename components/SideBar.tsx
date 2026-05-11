import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, Users } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-[300px] min-h-screen border-r border-border/50 p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
          C
        </div>
        <span className="font-bold text-xl">ClientPortal</span>
      </div>

      <nav className="flex-1 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-11 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10"
          asChild
        >
          <Link href="#">
            <LayoutDashboard className="size-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-11 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/10"
          asChild
        >
          <Link href="#">
            <Users className="size-5" />
            <span className="font-medium">Clients</span>
          </Link>
        </Button>
      </nav>
    </aside>
  );
}

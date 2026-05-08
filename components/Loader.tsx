import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export function SpinnerCom() {
  return (
    <p className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
    </p>
  );
}

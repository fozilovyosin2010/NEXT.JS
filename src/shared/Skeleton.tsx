import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function SkeletonFallBack() {
  return [1, 2, 3, 4].map((e) => (
    <TableRow key={e}>
      <TableCell className="font-medium">
        <Skeleton className="h-4 w-full my-2" />
      </TableCell>
      <TableCell className="font-medium">
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell className="font-medium">
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell className="font-medium">
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell className="font-medium ml-4">
        <Skeleton className="h-4 w-[50%]" />
      </TableCell>
    </TableRow>
  ));
}

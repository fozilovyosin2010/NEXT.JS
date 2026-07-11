import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function SkeletonFallBack() {
  return [1, 2, 3, 4].map((e) => (
    <TableRow key={e}>
      <TableCell>
        <Skeleton className="h-4 w-full my-2" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-full" />
      </TableCell>
      <TableCell className="">
        <div className="flex justify-end">
          <Skeleton className="h-4 w-1/2" />
        </div>
      </TableCell>
    </TableRow>
  ));
}

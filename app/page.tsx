import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { Idata } from "@/api/types.api";

export default async function Page() {
  let initialData: Idata[] = [];

  try {
    // 1. Read directly from the SQLite database on the server
    initialData = await prisma.user.findMany({
      orderBy: {
        id: "desc", // Show newest users first
      },
    });
  } catch (error) {
    console.error("Error fetching users from DB:", error);
  }

  // 3. Render the client component, passing the server-fetched data as props
  return <HomeClient initialData={initialData} />;
}

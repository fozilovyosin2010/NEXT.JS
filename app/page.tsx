import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { Idata } from "@/api/types.api";

export default async function Page() {
  let initialData: any = [];

  try {
    // Reading DIRECTLY from the database
    initialData = await prisma.user.findMany({
      orderBy: {
        id: "desc", // Show newest users first
      },
    });
  } catch (error) {
    console.error("Error fetching users from DB:", error);
  }

  return <HomeClient initialData={initialData} />;
}

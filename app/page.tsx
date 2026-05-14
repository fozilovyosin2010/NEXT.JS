import { getUserData } from "@/api/users.api";
import HomeClient from "@/components/HomeClient";

export default async function Page() {
  let initialData = [];

  try {
    // This happens on the SERVER before the page is sent to the browser
    initialData = await getUserData("");
  } catch (error) {
    console.error(error);
  }

  // We pass the data to the Client Component
  return <HomeClient initialData={initialData} />;
}

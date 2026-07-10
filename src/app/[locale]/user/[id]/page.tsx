import ModIdCom from "@/src/shared/ModIdCom";
import { CardImage } from "@/src/shared/UserIdCom";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div>
      <CardImage userId={id} />
      <ModIdCom />
    </div>
  );
};

export default page;

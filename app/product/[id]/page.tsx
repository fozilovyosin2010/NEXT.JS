//async -> v use it to send a request to server, so server will send us params
// const product = async ({ params }: { params: Promise<{ id: string }> }) => {
//   const { id } = await params;
//   return <div>id: {id}</div>;
// };

// export default product;

// with client component
"use client"; //used for working with client components(Client Side Rendering)

import { useParams } from "next/navigation";
const product = () => {
  const { id } = useParams();
  console.log(id);

  return <div>product id: {id}</div>;
};

export default product;

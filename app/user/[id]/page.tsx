"use client";

import { getById } from "@/api/users.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const UserById = () => {
  const { id } = useParams();

  //   console.log(paramsObj);

  const { data, isFetching } = useQuery({
    queryKey: [id],
    queryFn: () => getById(id),
  });

  console.log(data);

  return <div>UserById</div>;
};

export default UserById;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { boolean, number, string, z } from "zod";

const page = () => {
  const api = "https://667ab3c9bd627f0dcc90219a.mockapi.io/addTocart";

  // validation for form and data coming from back-end
  const addFormSchema = z.object({
    id: string().optional(),
    name: string().trim().nonempty("Name field is required"),
    city: string().trim().nonempty("City field is required"),
    job: string().trim().nonempty("Job field is required"),
    age: number().max(2),
    status: boolean().optional(),
  });

  // type for data coming from back-end(made by zod-schema)
  type Idata = z.infer<typeof addFormSchema>;

  const [users, setUsers] = useState<Idata[] | []>([]);
  const getData = async () => {
    try {
      const { data } = await axios.get(api);

      // z.array -> is used to make data-validation for arrays
      const schema = z.array(addFormSchema);

      // it checks data to match the scema
      const res = schema.safeParse(data);
      if (res.success) {
        setUsers(data);
      } else if (!res.success) {
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addFormSchema),
  });

  function addSubmit(e: any) {
    console.log(e);
  }
  console.log(errors);

  return (
    <div>
      <header className="flex justify-between border-b p-[10px_20px]">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(addSubmit)}
          action=""
        >
          <p className="text-red-500">{errors.name?.message}</p>
          <input
            placeholder="name"
            {...register("name")}
            type="text"
            className="border"
          />
          <p className="text-red-500">{errors.city?.message}</p>

          <input
            placeholder="city"
            {...register("city")}
            type="text"
            className="border"
          />
          <p className="text-red-500">{errors.job?.message}</p>

          <input
            placeholder="job"
            {...register("job")}
            type="text"
            className="border"
          />
          <p className="text-red-500">{errors.age?.message}</p>

          <input
            maxLength={2}
            placeholder="age"
            {...register("age", { valueAsNumber: true })}
            type="number"
            className="border"
          />
          <button className="border">Add</button>
        </form>
        {/* <input placeholder="Search" className="border" type="text" /> */}
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Job</th>
              <th>Status</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((e: Idata) => {
              return (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.city}</td>
                  <td>{e.job}</td>
                  <td>{e.status ? "ACTIVE" : "INACTIVE"}</td>
                  <td>{e.age}</td>
                  <td>
                    <button className="border">del</button>
                    <button className="border">edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default page;

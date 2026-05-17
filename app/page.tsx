"use client";

import { useEffect, useState } from "react";

const api = "http://localhost:3000/api/users";

const delData = async (id: string) => {
  try {
    await fetch(`${api}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
};
const page = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(api);
        const response = await data.json();

        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  function delBtn(id: string) {
    delData(id);
  }

  console.log(users);

  return (
    <div>
      home page
      <div>
        {users?.map((e: any) => {
          return (
            <div key={e.id}>
              <div>
                <span>{e.name}</span>
                <button onClick={() => delBtn(e.id)} className="border">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;

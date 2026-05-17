"use client";

import { useEffect, useState } from "react";

const api = "http://localhost:3000/api/users";

const page = () => {
  const [users, setUsers] = useState<any>([]);

  const getData = async () => {
    try {
      const data = await fetch(api);
      const response = await data.json();

      setUsers(response);
    } catch (error) {
      console.error(error);
    }
  };

  // here
  const delData = async (id: string) => {
    try {
      const response = await fetch(`${api}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postUsersData = async (obj: any) => {
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      if (response.ok) {
        getData();
      }
    } catch (error) {
      console.error("Failed to post");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function delBtn(id: string) {
    delData(id);
  }

  console.log(users);

  function hanAddSubmit(e: any) {
    e.preventDefault();

    const obj = {
      name: e.target["name"].value.trim(),
      city: e.target["city"].value.trim(),
      job: e.target["job"].value.trim(),
      age: e.target["age"].value.trim(),
    };

    postUsersData({ obj, status: false });
  }

  return (
    <div>
      home page
      <form action="" className="border" onSubmit={hanAddSubmit}>
        <input className="border" type="text" name="name" />
        <input className="border" type="text" name="city" />
        <input className="border" type="text" name="job" />
        <input className="border" type="number" name="age" />
        <button className="border">Submit</button>
      </form>
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

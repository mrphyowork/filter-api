import axios from "axios";
import React, { useEffect, useState } from "react";

const Form = () => {
  const [users, setUsers] = useState([]);
  const [names, setNames] = useState();
  const [searchBy, setSearchBy] = useState("name");
  const axi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  // async-await form
  // async function getUsers() {
  //   const response = await axi.get("/users");
  //   setUsers(response.data);
  // }
  // useEffect(() => {
  //   getUsers();
  // }, []);

  // promise fomm
  useEffect(() => {
    axi.get("/users").then((response) => setUsers(response.data));
  }, []);

  function handleChange(e) {
    setNames(e.target.value);
  }

  const filteredUsers = users.filter((user) => {
    const searchValue = names?.toLowerCase() || "";
    if (searchBy === "id") {
      return user.id.toString().includes(searchValue);
    } else if (searchBy === "name") {
      return user.name.toLowerCase().includes(searchValue);
    } else {
      return user.email.toLowerCase().includes(searchValue);
    }
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Filter API</h2>
      <form>
        <input
          type="search"
          name=""
          id=""
          placeholder="Search by Name ..."
          className="p-2 w-100"
          onChange={(e) => handleChange(e)}
        />
        <div className="mt-3">
          <input
            type="radio"
            name="search"
            id="id"
            value="id"
            onChange={(e) => setSearchBy(e.target.value)}
            checked={searchBy === "id"}
          />{" "}
          <label htmlFor="" className="me-3">
            By ID
          </label>
          <input
            type="radio"
            name="search"
            id="name"
            value="name"
            onChange={(e) => setSearchBy(e.target.value)}
            checked={searchBy === "name"}
          />{" "}
          <label htmlFor="" className="me-3">
            By Name
          </label>
          <input
            type="radio"
            name="search"
            id="email"
            value="email"
            onChange={(e) => setSearchBy(e.target.value)}
            checked={searchBy === "email"}
          />{" "}
          <label htmlFor="" className="me-3">
            By Email
          </label>
        </div>
      </form>

      <table className="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Form;

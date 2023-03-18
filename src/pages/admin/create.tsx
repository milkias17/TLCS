import SideBar from "@/components/sidebar";
import SidebarContent from "@/components/SidebarContent";
import { Departments, UserRole } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { makePostRequest } from "@lib/apiClient";

type CreateUserProps = {
  depts: Departments;
  roles: UserRole;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      depts: Departments,
      roles: UserRole,
    },
  };
};

export default function CreateUser({ depts, roles }: CreateUserProps) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(Object.keys(roles)[0].toLowerCase());
  const [phoneNum, setPhoneNum] = useState("");
  const [batch, setBatch] = useState("");
  const [dept, setDept] = useState(Object.keys(depts)[0].toLowerCase());
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const error = await makePostRequest(
      "/api/user",
      {
        password,
        fname,
        lname,
        email,
        role,
        phone_number: phoneNum,
        department: dept,
        batch,
      },
      router,
      true
    );

    if (error) {
      setErrorMsg(error);
    }
  }

  return (
    <>
      <SidebarContent>
        <form
          method="post"
          className="form-control gap-4"
          onSubmit={handleSubmit}
        >
          {errorMsg && (
            <h1 className="text-center text-3xl text-red-500 my-4">
              {errorMsg}
            </h1>
          )}
          <h1 className="text-center text-3xl">Create a new user</h1>
          <label htmlFor="fname" className="input-group">
            <span className="hidden w-1/2 sm:inline-flex">First Name</span>
            <input
              id="fname"
              name="fname"
              className="input-bordered input"
              type="text"
              required
              onChange={(e) => setFname(e.target.value)}
            />
          </label>
          <label htmlFor="lname" className="input-group">
            <span className="hidden w-1/2 sm:inline-flex">Last Name</span>
            <input
              id="lname"
              name="lname"
              className="input-bordered input"
              type="text"
              required
              onChange={(e) => setLname(e.target.value)}
            />
          </label>
          <label htmlFor="email" className="input-group">
            <span className="hidden w-1/2 sm:inline-flex">Email</span>
            <input
              id="email"
              name="email"
              className="input-bordered input"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="input-group">
            <span className="hidden w-1/2 sm:inline-flex">Password</span>
            <input
              id="password"
              name="password"
              className="input-bordered input"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="phoneNum" className="input-group">
            <span className="hidden w-1/2 sm:inline-flex">Phone Number</span>
            <input
              id="phoneNum"
              name="phoneNum"
              className="input-bordered input"
              type="text"
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </label>
          <select
            className="select w-full max-w-xs self-center select-bordered"
            onChange={(e) => setDept(e.target.value)}
            value={dept}
          >
            {Object.keys(depts).map((val, index) => {
              return <option key={index}>{val.toLowerCase()}</option>;
            })}
          </select>
          <select
            className="select w-full max-w-xs self-center select-bordered"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            {Object.keys(roles).map((val, index) => {
              return <option key={index}>{val.toLowerCase()}</option>;
            })}
          </select>
          {role === "student" ? (
            <>
              <label htmlFor="batch" className="input-group">
                <span className="hidden w-1/2 sm:inline-flex">Batch</span>
                <input
                  id="batch"
                  name="batch"
                  className="input-bordered input"
                  type="text"
                  required
                  onChange={(e) => setBatch(e.target.value)}
                />
              </label>
            </>
          ) : null}
          <button type="submit" className="btn-primary btn">
            Create User
          </button>
        </form>
      </SidebarContent>
      <SideBar>
        <Link href="/admin/create">Create User</Link>
        <Link href="/admin/delete">Manage Users</Link>
      </SideBar>
    </>
  );
}

import { UserRole } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { capitalize, roleMapper } from "@/lib/utils";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

interface Params extends ParsedUrlQuery {
  role: "student" | "instructor" | "admin" | "depthead" | "college_coordinator";
}

interface Role {
  role: UserRole;
}

export const getStaticProps: GetStaticProps<Role, Params> = (ctx) => {
  const { role } = ctx.params!;

  return {
    props: {
      role: roleMapper(role)
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { role: "student" } },
      { params: { role: "instructor" } },
      { params: { role: "admin" } },
      { params: { role: "depthead" } },
      { params: { role: "college_coordinator" } },
    ],
    fallback: false,
  };
};

export default function Login({ role }: Role) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const resp = await fetch('/api/login', {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        role
      })
    })
    const responseJson = await resp.json();
    if (!resp.ok) {
      setErrorMsg(responseJson.error);
    } else {
      router.push(`/${role.toLowerCase()}`)
    }
  }

  return (
    <div className="flex justify-center">
      <form method="post" className="form-control gap-4" onSubmit={handleSubmit}>
        {errorMsg && <h1>errorMsg</h1>}
        <h1 className="text-center text-3xl">{capitalize(role)} Login</h1>
        <label htmlFor="email" className="input-group">
          <span className="hidden w-1/2 sm:inline-flex">Email</span>
          <input
            id="email"
            name="email"
            className="input-bordered input"
            type="text"
            placeholder="johndoe@mail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="input-group justify-center">
          <span className="hidden w-1/2 sm:inline-flex">Password</span>
          <input
            id="password"
            name="password"
            className="input-bordered input"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="btn-primary btn">
          Login
        </button>
      </form>
    </div>
  );
}

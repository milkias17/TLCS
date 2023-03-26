// Import required dependencies and components
import type { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { prettify } from "../../lib/utils";
import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import UserContext from "../../context/UserContext";
import { getUser, loginUser } from "../../lib/apiClient";
import SidebarContent from "../../components/SidebarContent";

// Define the Params interface for role
interface Params extends ParsedUrlQuery {
  role: "student" | "instructor" | "admin" | "depthead" | "college_coordinator";
}

// Define getStaticProps function for static site generation
export const getStaticProps: GetStaticProps<Params, Params> = (ctx) => {
  const { role } = ctx.params!;

  return {
    props: {
      role,
    },
  };
};

// Define getStaticPaths function for dynamic static site generation
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

/**
 * Login component.
 *
 * This component renders a login form for different user roles, including
 * student, instructor, admin, department head, and college coordinator.
 *
 * @param {Params} role - The role for which the login form is displayed.
 * @returns {JSX.Element} The Login component.
 */
export default function Login({ role }: Params) {
  // Initialize state variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // Access setUser function from UserContext
  const { setUser } = useContext(UserContext);

  // Initialize useRouter for navigation
  const router = useRouter();

  // Define the handleSubmit function for handling form submission
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const hasError = await loginUser(
      { email, password, role },
      router,
      setErrorMsg
    );
    if (!hasError) {
      const user = await getUser();
      setUser(user);
      setErrorMsg("");
    }
  }

  // Render the Login component
  return (
    <SidebarContent>
      <form
        method="post"
        className="form-control gap-4"
        onSubmit={handleSubmit}
      >
        {errorMsg && (
          <h1 className="text-center text-3xl text-red-500 my-4">{errorMsg}</h1>
        )}
        <h1 className="text-center text-3xl">{prettify(role)} Login</h1>
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
    </SidebarContent>
  );
}

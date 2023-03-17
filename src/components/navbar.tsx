import UserContext from "@context/UserContext";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeRequest } from "@lib/apiClient";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  function handleClick() {
    makeRequest("/api/logout", router);
    setUser(null);
  }

  return (
    <nav className="navbar relative z-10 bg-transparent">
      <Link className="navbar-start link link-primary text-2xl" href="/">
        TLCS
      </Link>
      <div className="navbar-end gap-4">
        <Link
          className="link link-primary text-xl"
          href={`/${user?.role.toLowerCase()}`}
        >
          Dashboard
        </Link>
        {!user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
              Login
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/login/student">Student</Link>
              </li>
              <li>
                <Link href="/login/instructor">Instructor</Link>
              </li>
              <li>
                <Link href="/login/college_coordinator">
                  College Coordinator
                </Link>
              </li>
              <li>
                <Link href="/login/depthead">Department Head</Link>
              </li>
              <li>
                <Link href="/login/admin">Adminstrator</Link>
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn m-1" onClick={handleClick}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

import React from "react";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <nav className="navbar">
        <a className="navbar-start link link-primary text-lg" href="/">
          TLCS
        </a>
        <div className="navbar-end">
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
                <Link href="/login/college_coordinator">College Coordinator</Link>
              </li>
              <li>
                <Link href="/login/admin">Adminstrator</Link>
              </li>
              <li>
                <Link href="/login/depthead">Department Head</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}

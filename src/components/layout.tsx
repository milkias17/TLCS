import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <nav className="navbar">
        <a className="navbar-start link link-primary text-lg" href="/">TLCS</a>
        <div className="navbar-end">
          <ul className="menu menu-horizontal">
            <li>
              <a className="btn rounded">Login</a>
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </>
  );
}

import UserContext from "@context/UserContext";
import { useContext } from "react";
import SideBar from "@components/sidebar";
import SideBarContent from "@components/SidebarContent";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
      <SideBarContent>
        <h1 className="text-2xl">
          Welcome {user?.fname} {user?.lname}
        </h1>
      </SideBarContent>
      <SideBar>
        <Link href="/admin/create">Create User</Link>
        <Link href="/admin/delete">Manage Users</Link>
      </SideBar>
    </>
  );
}
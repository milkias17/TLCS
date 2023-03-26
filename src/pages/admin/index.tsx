// Import required dependencies
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import SideBar from "../../components/sidebar";
import SideBarContent from "../../components/SidebarContent";
import Link from "next/link";

/**
 * AdminDashboard component.
 *
 * This component renders an admin dashboard that displays a welcome message
 * with the user's first and last name. It also includes a sidebar with links
 * to create and manage users.
 *
 * @returns {JSX.Element} The AdminDashboard component.
 */
export default function AdminDashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
      {/* Display a welcome message with the user's first and last name */}
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

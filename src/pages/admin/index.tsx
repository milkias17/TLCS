import UserContext from "../../context/UserContext";
import { useContext } from "react";
import SideBar from "../../components/sidebar";
import SideBarContent from "../../components/SidebarContent";
import Link from "next/link";

export default function AdminDashboard(props) {
  const { user } = useContext(UserContext);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar>
        <div className="bg-white p-4">
          <h2 className="text-lg font-semibold">User Management</h2>
          <nav className="mt-5 space-y-2">
            <Link href="/admin/create">
              <a className="block py-2 px-4 rounded-lg hover:bg-gray-200">
                Create User
              </a>
            </Link>
            <Link href="/admin/delete">
              <a className="block py-2 px-4 rounded-lg hover:bg-gray-200">
                Manage Users
              </a>
            </Link>
          </nav>
        </div>
      </SideBar>
      <SideBarContent>
        <h1 className="text-2xl">
          Welcome {user?.fname} {user?.lname}
        </h1>
      </SideBarContent>
    </div>
  );
}


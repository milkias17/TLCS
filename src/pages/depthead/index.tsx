import SideBar from "../../components/sidebar";
import SidebarContent from "../../components/SidebarContent";
import UserContext from "../../context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export default function DeptHeadDashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <SideBar>
          <div className="bg-white p-4">
            <h2 className="text-lg font-semibold">Course Management</h2>
            <nav className="mt-5 space-y-2">
              <Link href="/depthead/newCourse">
                <a className="block py-2 px-4 rounded-lg hover:bg-gray-200">
                  Create Course
                </a>
              </Link>
              <Link href="/depthead/editCourse">
                <a className="block py-2 px-4 rounded-lg hover:bg-gray-200">
                  Manage Course
                </a>
              </Link>
            </nav>
          </div>
        </SideBar>
        <SidebarContent>
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">
              Welcome {user?.fname} {user?.lname}
            </h1>
            {/* You can add more dashboard content here */}
          </div>
        </SidebarContent>
      </div>
    </>
  );
}

import SideBar from "@/components/sidebar";
import SidebarContent from "@/components/SidebarContent";
import UserContext from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export default function DeptHeadDashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
      <SidebarContent>
        <h1 className="text-2xl">
          Welcome {user?.fname} {user?.lname}
        </h1>
      </SidebarContent>
      <SideBar>
        <Link href="/depthead/course">Create Course</Link>
      </SideBar>
    </>
  );
}

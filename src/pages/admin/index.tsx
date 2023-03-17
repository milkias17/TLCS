import UserContext from "@context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import SideBar from "@components/sidebar";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      router.push("/");
    }
  }, [user]);

  return (
    <SideBar>
      <Link href="/admin/create">Create User</Link>
      <Link href="/admin/delete">Manage Users</Link>
    </SideBar>
      );
}

import UserContext from "@context/UserContext";
import { useContext, useEffect, useState } from "react";
import SideBar from "@components/sidebar";
import SideBarContent from "@components/SidebarContent";
import Link from "next/link";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const coursesList = await prisma.course.findMany();
  return {
    props: {
      coursesList,
    },
  };
};

export default function InstructorDashboard({ coursesList}: ) {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState(null);

  useEffect(() => {}, []);

  return (
    <>
      <SideBarContent>
        <h1 className="text-2xl">
          Welcome {user?.fname} {user?.lname}
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SideBarContent>
      <SideBar>
        <Link href="/admin/create">Create User</Link>
        <Link href="/admin/delete">Manage Users</Link>
      </SideBar>
    </>
  );
}

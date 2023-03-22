import SideBar from "../../components/sidebar";
import SidebarContent from "../../components/SidebarContent";
import { makeRequest } from "../../lib/apiClient";
import prisma from "../../lib/prisma";
import { Course } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { FormEvent, useState } from "react";

type Props = {
  filterOptions: string[];
  coursesList: Course[] | null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const filterOptions = [
    "course_name",
    "course_code",
    "batch",
    "dept",
    "chapter_length",
    "no_week_take",
    "description",
  ];
  const coursesList = await prisma.course.findMany();
  return {
    props: {
      filterOptions,
      coursesList,
    },
  };
};

export default function ManageCourse({ filterOptions, coursesList }: Props) {
  const [courses, setCourses] = useState<Course[] | null>(coursesList);
  const [filterby, setFilterBy] = useState<string>(filterOptions[0]);
  const [filterVal, setFilterVal] = useState<string | null>(null);

  async function handleSumbit(e: FormEvent) {
    e.preventDefault();
    const coursesList = await makeRequest(
      `/api/getCourses?filterBy=${filterby}&filterVal=${filterVal}`,
      null,
      true
    );
    if (coursesList) {
      setCourses(coursesList.courses);
    }
  }

  return (
    <>
      <SidebarContent>
        <div className="flex flex-col gap-5">
          <form method="POST" className="flex gap-4" onSubmit={handleSumbit}>
            <select
              className="select"
              value={filterby}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              {filterOptions.map((val, index) => {
                return <option key={index}>{val}</option>;
              })}
            </select>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs flex-grow"
              onChange={(e) => setFilterVal(e.target.value)}
            />
            <button type="submit" className="btn-primary btn">
              Search Course
            </button>
          </form>
          <div className="overflow-x-auto">
            {courses && courses?.length !== 0 && (
              <table className="table w-full">
                <thead>
                  <tr>
                    {Object.keys(courses[0]).map((val, i) => {
                      return <th key={i}>{val}</th>;
                    })}
                    <th key={120}>Edit Course</th>
                    <th key={121}>Assign</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((courseObj, i) => {
                    return (
                      <tr key={i}>
                        {Object.keys(courses[0])
                          .map((key, i) => {
                            // @ts-ignore
                            return <td key={key}>{courseObj[key]}</td>;
                          })
                          .concat([
                            <td key={courseObj.course_code}>
                              <Link
                                href={`/course/edit/${courseObj.course_code}`}
                                className="btn btn-primary"
                              >
                                Edit
                              </Link>
                            </td>,
                            <td key={500}>
                              <Link
                                href={`/course/assign/${courseObj.course_code}`}
                                className="btn btn-primary"
                              >
                                Assign Course
                              </Link>
                            </td>,
                          ])}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </SidebarContent>
      <SideBar>
        <Link href="/depthead/newCourse">Create Course</Link>
        <Link href="/depthead/editCourse">Manage Course</Link>
      </SideBar>
    </>
  );
}

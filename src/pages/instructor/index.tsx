// Import required dependencies and components
import UserContext from "../../context/UserContext";
import { FormEvent, useContext, useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import SideBarContent from "../../components/SidebarContent";
import Link from "next/link";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { Course } from "@prisma/client";

// Define the getServerSideProps function for server-side rendering
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await prisma.session.findUnique({
    where: {
      uuid: ctx.req.cookies.sessionId,
    },
  });

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const courses = await prisma.assign_course.findMany({
    where: {
      instructor_id: user.user_id,
    },
    select: {
      course: true,
    },
  });

  console.log(courses);

  return {
    props: {
      courses: courses.map((course) => {
        return course.course;
      }),
    },
  };
};

// Type definition for InstructorDashboard component props
type Props = {
  courses: Course[];
};

/**
 * InstructorDashboard component.
 *
 * This component renders an instructor dashboard that displays a welcome
 * message with the user's first and last name, and a table of courses
 * assigned to the instructor. It also provides links to edit course
 * information, add or edit course outline, and view course events.
 *
 * @param {Props} props - The component's props, containing a list of courses.
 * @returns {JSX.Element} The InstructorDashboard component.
 */
export default function InstructorDashboard({ courses }: Props) {
  // Access the user object from UserContext
  const { user } = useContext(UserContext);

  // Define the handleClick function for handling table row click events
  function handleClick(e: FormEvent, course_code: string) {
    console.log("Course Code: " + course_code);
  }

  // Render the InstructorDashboard component
  return (
    <>
      {/* Render the welcome message and courses table */}
      <SideBarContent>
        <h1 className="text-3xl">
          Welcome {user?.fname} {user?.lname}
        </h1>
        <div className="overflow-x-auto mt-4">
          {/* Check if courses are available and render the table */}
          {courses && courses?.length !== 0 && (
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl text-center text-accent">Courses</h1>
              <table className="table w-full">
                <thead>
                  <tr>
                    {Object.keys(courses[0]).map((val, i) => {
                      return <th key={i}>{val}</th>;
                    })}
                    <th key={120}>Edit Course</th>
                    <th key={121}>Add/Edit Course Outline</th>
                    <th key={122}>Course Events</th>
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
                                href={`/course/${courseObj.course_code}`}
                                className="btn btn-primary"
                              >
                                Edit
                              </Link>
                            </td>,
                            <td key={123}>
                              <Link
                                className="btn btn-primary"
                                href={`/course/outline/${courseObj.course_code}`}
                              >
                                Add/Edit
                              </Link>
                            </td>,
                            <td key={124}>
                              <Link
                                className="btn btn-primary"
                                href={`/course/event/${courseObj.course_code}`}
                              >
                                View
                              </Link>
                            </td>,
                          ])}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </SideBarContent>
    </>
  );
}

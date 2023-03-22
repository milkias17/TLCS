import SidebarContent from "@/components/SidebarContent";
import { makePostRequest, makeRequest } from "@/lib/apiClient";
import prisma from "@/lib/prisma";
import { Course, User } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.params === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const course = await prisma.course.findUnique({
    where: {
      course_code: ctx.params.id! as string,
    },
  });

  if (!course) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const filterOptions = [
    "fname",
    "lname",
    "department",
    "user_id",
    "email",
    "phone_number",
  ];

  return {
    props: {
      course,
      filterOptions,
    },
  };
};

type Props = {
  course: Course;
  filterOptions: string[];
};

export default function AssignCourse({ course, filterOptions }: Props) {
  const [filterBy, setFilterBy] = useState(filterOptions[0]);
  const [filterVal, setFilterVal] = useState("");
  const router = useRouter();
  const [instructors, setInstructors] = useState<User[] | "">("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSumbit(e: FormEvent) {
    e.preventDefault();
    const instructors = await makeRequest("/api/instructor", router, true);
    if (!("detail" in instructors)) {
      setInstructors(instructors.instructors);
    }
  }

  async function handleClick(e: FormEvent, chosenIndex: number) {
    if (typeof instructors === "string") {
      return;
    }

    const courseAssignment = await makePostRequest(
      "/api/assignCourse",
      {
        course_code: course.course_code,
        instructor_id: instructors[chosenIndex].user_id,
      },
      router,
      true
    );

    if (courseAssignment) {
      setErrorMsg(courseAssignment);
    }
  }

  return (
    <SidebarContent>
      <div className="flex flex-col gap-4">
        {errorMsg && (
          <h1 className="text-center tex-3xl text-red-500 my-4">{errorMsg}</h1>
        )}
        <div className="flex flex-col gap-4 border border-primary flex-grow-0">
          <h1 className="text-5xl text-center bg-neutral p-4 rounded">
            Course Description
          </h1>
          {Object.keys(course).map((key, i) => {
            return (
              <div key={i} className="flex gap-4 p-1">
                <p className="text-secondary">{key}</p>
                {/* @ts-ignore */}
                <p>{course[key]}</p>
              </div>
            );
          })}
        </div>

        <form method="POST" className="flex gap-4" onSubmit={handleSumbit}>
          <select
            className="select"
            value={filterBy}
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
            value={filterVal}
          />
          <button type="submit" className="btn-primary btn">
            Search Instructor
          </button>
        </form>
        <div className="overflow-x-auto">
          {instructors && instructors?.length !== 0 && (
            <table className="table w-full">
              <thead>
                <tr>
                  {Object.keys(instructors[0]).map((val, i) => {
                    return <th key={i}>{val}</th>;
                  })}
                  <th key={121}>Assign</th>
                </tr>
              </thead>
              <tbody>
                {instructors.map((instructorObj, i) => {
                  return (
                    <tr key={i}>
                      {Object.keys(instructors[0])
                        .map((key, i) => {
                          // @ts-ignore
                          return <td key={key}>{instructorObj[key]}</td>;
                        })
                        .concat([
                          <tr key={130}>
                            <button
                              className="btn btn-primary"
                              onClick={(e) => {
                                handleClick(e, i);
                              }}
                            >
                              Assign to Instructor
                            </button>
                          </tr>,
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
  );
}

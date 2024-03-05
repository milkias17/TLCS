import SidebarContent from "@/components/SidebarContent";
import { makePutRequest } from "@/lib/apiClient";
import prisma from "@/lib/prisma";
import { Course, Departments } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.params === undefined) {
    return { props: {} };
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

  return {
    props: {
      course,
      depts: Departments,
    },
  };
};

type Props = {
  course: Course;
  depts: Departments;
};

export default function EditCourse({ course, depts }: Props) {
  const [name, setName] = useState(course.course_name);
  const [chapterLength, setChapterLen] = useState(course.chapter_length);
  const [description, setDesc] = useState(course.description);
  const [batch, setBatch] = useState(course.batch);
  const [dept, setDept] = useState(course.dept);
  const [numWeeks, setNumWeeks] = useState(course.no_week_take);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const error = await makePutRequest(
      "/api/course",
      {
        course_code: course.course_code,
        course_name: name,
        batch,
        dept,
        chapter_length: chapterLength,
        no_week_take: numWeeks,
        description,
      },
      router,
      true
    );

    if (error) {
      setErrorMsg(error);
    }
  }
  return (
    <SidebarContent>
      <form
        method="post"
        className="form-control gap-4"
        onSubmit={handleSubmit}
      >
        {errorMsg && (
          <h1 className="text-center text-3xl text-red-500 my-4">{errorMsg}</h1>
        )}
        <h1 className="text-center text-3xl">Update Course</h1>
        <label htmlFor="name" className="input-group">
          <span className="hidden w-1/2 sm:inline-flex">Course Name</span>
          <input
            id="name"
            name="name"
            className="input-bordered input"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label htmlFor="chapterLen" className="input-group">
          <span className="hidden w-1/2 sm:inline-flex">Chapter Length</span>
          <input
            id="chapterLen"
            name="chapterLen"
            className="input-bordered input"
            type="text"
            required
            onChange={(e) => setChapterLen(parseInt(e.target.value))}
            value={chapterLength}
          />
        </label>
        <label htmlFor="desc" className="input-group">
          <span className="hidden w-1/2 sm:inline-flex">Description</span>
          <input
            id="desc"
            name="desc"
            className="input-bordered input"
            type="desc"
            required
            onChange={(e) => setDesc(e.target.value)}
            value={description || ""}
          />
        </label>
        <label htmlFor="numWeeks" className="input-group">
          <span className="hidden w-1/2 sm:inline-flex">
            Number of Weeks to Take
          </span>
          <input
            id="numWeeks"
            name="numWeeks"
            className="input-bordered input"
            type="numWeeks"
            required
            onChange={(e) => setNumWeeks(parseInt(e.target.value))}
            value={numWeeks}
          />
        </label>
        <select
          className="select w-full max-w-xs self-center select-bordered"
          onChange={(e) => setDept(e.target.value)}
          value={dept}
        >
          {Object.keys(depts).map((val, index) => {
            return <option key={index}>{val.toLowerCase()}</option>;
          })}
        </select>
        <label htmlFor="batch" className="input-group">
          <span className="hidden w-1/2 sm:inline-flex">Batch</span>
          <input
            id="batch"
            name="batch"
            className="input-bordered input"
            type="text"
            required
            onChange={(e) => setBatch(e.target.value)}
            value={batch}
          />
        </label>
        <button type="submit" className="btn-primary btn">
          Update Course
        </button>
      </form>
    </SidebarContent>
  );
}

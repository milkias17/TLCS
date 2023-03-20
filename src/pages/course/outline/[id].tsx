import SidebarContent from "../../../components/SidebarContent";
import { makePostRequest, makePutRequest } from "../../../lib/apiClient";
import prisma from "../../../lib/prisma";
import { Course_outline } from "@prisma/client";
import { GetServerSideProps } from "next";
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
  const courseOutline = await prisma.course_outline.findUnique({
    where: {
      course_code: ctx.params.id! as string,
    },
  });

  return {
    props: {
      courseOutline,
      edit: courseOutline !== null,
      courseCode: course.course_code
    },
  };
};

type Props = {
  courseOutline: Course_outline;
  edit: boolean;
  courseCode: string;
};

export default function CourseOutline({ courseOutline, edit, courseCode }: Props) {
  const [objectives, setObjectives] = useState(
    courseOutline?.course_objectives ?? ""
  );
  const [topics, setTopics] = useState(courseOutline?.topics || "");
  const [chaptWeek, setChaptWeek] = useState(
    courseOutline?.no_chapterperweek?.toString() || ""
  );
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (edit) {
      const response = await makePutRequest(
        "/api/courseOutline",
        {
          courseCode: courseCode,
          course_objectives: objectives,
          topics: topics,
          chapterPerWeek: chaptWeek,
        },
        router
      );
    } else {
      const response = await makePostRequest(
        "/api/courseOutline",
        {
          courseCode: courseCode,
          course_objectives: objectives,
          topics: topics,
          chapterPerWeek: chaptWeek,
        },
        router
      );
    }
  }

  return (
    <SidebarContent>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl text-center">Course Outline</h1>
        <form className="form-control gap-4" onSubmit={handleSubmit}>
          <label className="label">
            <span className="label-text">Course Objectives</span>
          </label>
          <textarea
            className="textarea textarea-bordered textarea-lg w-full max-w-xs"
            placeholder="Course Objectives"
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
          ></textarea>
          <label className="label">
            <span className="label-text">Topics Covered</span>
          </label>
          <textarea
            className="textarea textarea-bordered textarea-lg w-full max-w-xs"
            placeholder="Topics Covered"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
          ></textarea>
          <label className="label">
            <span className="label-text">Number of Weeks per chapter</span>
          </label>
          <input
            className="input input-bordered"
            placeholder="Number of Weeks per chapter"
            value={chaptWeek}
            onChange={(e) => setChaptWeek(e.target.value)}
          ></input>
          <button className="btn btn-primary" type="submit">
            {edit ? "Edit" : "Add"} Course Outline
          </button>
        </form>
      </div>
    </SidebarContent>
  );
}

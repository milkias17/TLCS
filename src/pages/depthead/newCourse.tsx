import SideBar from "@/components/sidebar";
import SidebarContent from "@/components/SidebarContent";
import { Departments } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { makePostRequest } from "@lib/apiClient";

type CreateUserProps = {
  depts: Departments;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      depts: Departments,
    },
  };
};

export default function CreateCourse({ depts }: CreateUserProps) {
  const [name, setName] = useState("");
  const [chapterLength, setChapterLen] = useState("");
  const [description, setDesc] = useState("");
  const [batch, setBatch] = useState("");
  const [dept, setDept] = useState(Object.keys(depts)[0].toLowerCase());
  const [numWeeks, setNumWeeks] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const error = await makePostRequest(
      "/api/course",
      {
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
    <>
      <SidebarContent>
        <form
          method="post"
          className="form-control gap-4"
          onSubmit={handleSubmit}
        >
          {errorMsg && (
            <h1 className="text-center text-3xl text-red-500 my-4">
              {errorMsg}
            </h1>
          )}
          <h1 className="text-center text-3xl">Create a new course</h1>
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
              onChange={(e) => setChapterLen(e.target.value)}
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
              value={description}
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
              onChange={(e) => setNumWeeks(e.target.value)}
              value={description}
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
            Create Course
          </button>
        </form>
      </SidebarContent>
    </>
  );
}

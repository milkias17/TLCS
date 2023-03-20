import SidebarContent from "@/components/SidebarContent";
import { makePostRequest } from "@/lib/apiClient";
import prisma from "@/lib/prisma";
import { Course_event } from "@prisma/client";
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

  const courseEvents = await prisma.course_event.findMany({
    where: {
      course_code: ctx.params.id! as string,
    },
    select: {
      event_id: false,
      event_date: true,
      event_type: true,
      event_name: true,
      description: true,
    },
  });

  return {
    props: {
      orgEvents:
        courseEvents.map((courseEvent) => {
          return {
            ...courseEvent,
            event_date: courseEvent.event_date.toLocaleDateString(),
          };
        }) ?? [],
      courseCode: ctx.params.id! as string,
    },
  };
};

type Props = {
  orgEvents: Course_event[];
  courseCode: string;
};

export default function CourseEvents({ orgEvents, courseCode }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [courseEvents, setCourseEvents] = useState(orgEvents);
  const router = useRouter();

  function handleClick(e: FormEvent, index: number) {
    console.log("Clicked");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const courseEvent = await makePostRequest(
      "/api/courseEvent",
      {
        course_code: courseCode,
        event_name: name,
        event_type: type,
        event_date: date,
        description: desc,
      },
      router,
      true
    );
    setCourseEvents((courseEvents) => {
      return [...courseEvents, courseEvent];
    });
  }

  return (
    <SidebarContent>
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-4xl text-primary">Course Events</h1>
        <div className="overflow-x-auto">
          {courseEvents.length !== 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  {Object.keys(courseEvents[0]).map((val, i) => {
                    return <th key={i}>{val}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {courseEvents.map((courseEventObj, i) => {
                  return (
                    <tr key={i}>
                      {Object.keys(courseEvents[0]).map((key, i) => {
                        // @ts-ignore
                        return <td key={key}>{courseEventObj[key]}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="text-red-400 text-3xl">No course Events found</h1>
          )}
        </div>
        <form className="form-control gap-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl">Create a new Course Event</h1>
          <input
            type="text"
            placeholder="Event name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Event Type"
            className="input input-bordered w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <input
            type="date"
            placeholder="Event Date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">
            Add Course Event
          </button>
        </form>
      </div>
    </SidebarContent>
  );
}

import SideBar from "@/components/sidebar";
import SidebarContent from "@/components/SidebarContent";
import prisma from "@/lib/prisma";
import { Course, Course_event } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sessionId = ctx.req.cookies.sessionId;
  if (!sessionId) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const user = (
    await prisma.session.findUnique({
      where: {
        uuid: sessionId,
      },
      select: {
        user: true,
      },
    })
  )?.user;

  if (!user || !user.batch) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let courses = await prisma.course.findMany({
    where: {
      batch: user.batch,
    },
    select: {
      course_code: true,
      course_name: true,
      batch: true,
      chapter_length: true,
      no_week_take: true,
      description: true,
      course_events: true,
    },
  });

  let courseEvents: Course_event[] = [];
  for (const course of courses) {
    courseEvents = [...courseEvents, ...course.course_events];
  }
  console.log(courseEvents);

  // @ts-ignore
  courses = await prisma.course.findMany({
    where: {
      batch: user.batch,
    },
    select: {
      course_code: true,
      course_name: true,
      batch: true,
      chapter_length: true,
      no_week_take: true,
      description: true,
    },
  });

  return {
    props: {
      courses,
      events: courseEvents.map((ce) => {
        return {
          ...ce,
          event_date: ce.event_date.toLocaleString(),
        };
      }),
      courseHeaders: [
        "Course Name",
        "Course Code",
        "Batch",
        "Chapter Length",
        "Course Length",
        "Description",
      ],
      eventsHeaders: [
        "Course Code",
        "Event Name",
        "Event Type",
        "Event Date",
        "Description",
      ],
    },
  };
};

type Props = {
  courses: Course[];
  events: {
    event_date: string;
    event_id: number;
    course_code: string;
    event_name: string;
    event_type: string;
    description: string | null;
  }[];
  eventsHeaders: string[];
  courseHeaders: string[];
};

export default function StudentDashboard({
  courses,
  events,
  eventsHeaders,
  courseHeaders,
}: Props) {
  return (
    <>
      <SidebarContent>
        <div className="overflow-x-auto flex flex-col gap-4">
          <h1 className="text-center text-4xl text-primary">Courses</h1>
          {courses.length > 0 && (
            <table className="table w-full">
              <thead>
                <tr>
                  {courseHeaders.map((title, i) => {
                    return <th key={i}>{title}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {courses.map((course, i) => {
                  return (
                    <tr key={i}>
                      {Object.values(course).map((val, i) => {
                        return <td key={i}>{val}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <h1 className="text-center text-4xl text-primary">Upcoming Events</h1>
          {events.length > 0 && (
            <table className="table w-full">
              <thead>
                <tr>
                  {Object.keys(events[0]).map((title, i) => {
                    return <th key={i}>{title}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {events.map((event, i) => {
                  return (
                    <tr key={i}>
                      {/* @ts-ignore */}
                      {Object.values(event).map((val, i) => {
                        return <td key={i}>{val}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </SidebarContent>
      <SideBar>
        <Link href="/student/giveFeedback">Give Rating</Link>
      </SideBar>
    </>
  );
}

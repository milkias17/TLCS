import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import UserContext from "@context/UserContext";
import prisma from "@/lib/prisma";
import { Course, Progress } from "@prisma/client";

type Props = {
  course: Course;
};

export default function CourseOutline({ course }: Props) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      const data = await prisma.progress.findFirst({
        where: {
          user_id: user.user_id,
          course_code: course.course_code,
        },
      });
      setProgress(data);
    }
    if (user) {
      fetchProgress();
    }
  }, [user]);

  async function handleClick() {
    if (!user) {
      router.push("/");
      return;
    }
    const data = {
      user_id: user.user_id,
      course_code: course.course_code,
      validated: true,
    };
    try {
      await prisma.progress.update({
        where: {
          id: progress?.id,
        },
        data: data,
      });
      setProgress({ ...progress, validated: true });
      alert(`Successfully validated ${course.title} course progress.`);
    } catch (error) {
      console.log(error);
      alert(
        `Error validating ${course.title} course progress. Please try again later.`
      );
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-medium">Course Outline</h2>
        <Link href={`/course/outline/${course.course_code}`} passHref>
          <a className="text-sm font-medium text-blue-600 hover:text-blue-800">
            Edit Course Outline
          </a>
        </Link>
      </div>
      <ul>
        {course.outline.map((item, index) => (
          <li key={index} className="mb-4">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="mt-2">{item.description}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-4">
          <h2 className="text-xl font-medium">Course Progress</h2>
          {progress?.validated && (
            <span className="text-green-600 font-medium">(Validated)</span>
          )}
        </div>
        {user && (
          <button
            onClick={handleClick}
            disabled={!progress || progress.validated}
            className={`btn btn-primary ${
              progress && progress.validated
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Validate Progress
          </button>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { course_code } = context.params;
  const course = await prisma.course.findUnique({
    where: {
      course_code: course_code,
    },
    include: {
      outline: true,
    },
  });
  return {
    props: {
      course,
    },
  };
}

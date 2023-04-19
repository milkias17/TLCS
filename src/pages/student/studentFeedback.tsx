import { useState, useContext } from "react";
import { Course } from "@prisma/client";
import UserContext from "@context/UserContext";
import prisma from "@/lib/prisma";

type Props = {
  courses: Course[];
};

export default function StudentFeedback({ courses }: Props) {
  const { user } = useContext(UserContext);
  const [feedback, setFeedback] = useState<{ [key: string]: number }>({});

  async function handleSubmit(courseCode: string, rating: number) {
    const res = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        courseCode,
        rating,
        studentId: user?.user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setFeedback((prev) => ({
        ...prev,
        [courseCode]: rating,
      }));
    }
  }

  return (
    <div>
      <h1 className="text-3xl">Student Feedback</h1>
      <div className="overflow-x-auto mt-4">
        {courses && courses?.length !== 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl text-center text-accent">Courses</h1>
            <table className="table w-full">
              <thead>
                <tr>
                  {Object.keys(courses[0]).map((val, i) => {
                    return <th key={i}>{val}</th>;
                  })}
                  <th key={120}>Rate Course</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((courseObj, i) => {
                  const courseCode = courseObj.course_code;
                  const rating = feedback[courseCode] ?? 0;
                  return (
                    <tr key={i}>
                      {Object.keys(courses[0])
                        .map((key, i) => {
                          // @ts-ignore
                          return <td key={key}>{courseObj[key]}</td>;
                        })
                        .concat(
                          <td key={courseCode}>
                            <div className="flex items-center gap-4">
                              <div>Rate:</div>
                              <select
                                value={rating}
                                onChange={(e) =>
                                  handleSubmit(courseCode, Number(e.target.value))
                                }
                                className="border rounded-md p-2"
                              >
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                        )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

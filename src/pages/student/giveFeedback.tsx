import SidebarContent from "../../components/SidebarContent";
import { feedback } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import { makePostRequest } from "../../lib/apiClient";
import { Course } from "@prisma/client";
import prisma from "../../lib/prisma";
import UserContext from "../../context/UserContext";

type Props = {
  user_id: string[];
  courses: Course[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uuid = context.req.cookies.sessionId;
  const session = await prisma.session.findUnique({
    where: {
      uuid,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const user = session?.user;

  if (!user.batch) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const courses = await prisma.course.findMany({
    where: {
      batch: user.batch,
    },
  });

  return {
    props: {
      courses,
    },
  };
};

const FeedbackForm = ({ courses }: Props) => {
  const [course_code, setCourse_code] = useState("");
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState("");
  const [no_chapter_completed, setNo_chapter_completed] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { user } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const error = await makePostRequest(
      "/api/feedback",
      {
        user_id: user?.user_id,
        course_code,
        rating,
        comment,
        no_chapter_completed,
      },
      router,
      true
    );

    if (error) {
      setErrorMsg(error);
    } else {
      alert("Feedback created successfully!");
    }
  };

  return (
    <>
      <SidebarContent>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="form-control gap-4"
        >
          {errorMsg && (
            <h1 className="text-center text-3xl text-red-500 my-4">
              {errorMsg}
            </h1>
          )}
          <label htmlFor="course_code" className="input-group">
            <span className="hidden w-1/2 sm:inline-flex">Select Course:</span>
            <select
              className="select w-full max-w-xs self-center select-bordered"
              value={course_code}
              onChange={(e) => setCourse_code(e.target.value)}
              required
            >
              <option value="">Select course</option>
              {courses.map((crs) => (
                <option key={crs.course_code} value={crs.course_code}>
                  {crs.course_name}
                </option>
              ))}
            </select>
          </label>
          <div className="rating">
            <label htmlFor="rating-1" className="mr-10">
              Rating
            </label>
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star"
              value={1}
              onChange={(e) => setRating(1)}
              checked={rating === 1}
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star"
              value={2}
              checked={rating === 2}
              onChange={(e) => setRating(2)}
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star"
              value={3}
              checked={rating === 3}
              onChange={(e) => setRating(3)}
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star"
              value={4}
              checked={rating === 4}
              onChange={(e) => setRating(4)}
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star"
              value={5}
              checked={rating === 5}
              onChange={(e) => setRating(5)}
            />
          </div>
          <label htmlFor="comment" className="input-group">
            <span className="hidden w-1/2 sm:inline-flex">Comment:</span>
            <textarea
              className="textarea-primary"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <label htmlFor="rating" className="input-group">
            <span className="hidden w-1/2 sm:inline-flex">
              No. of Chapters Completed:
            </span>
            <input
              type="number"
              value={no_chapter_completed}
              onChange={(e) => setNo_chapter_completed(e.target.value)}
            />
          </label>
          <button type="submit" className="btn-primary btn">
            Submit Feedback
          </button>
        </form>
      </SidebarContent>
    </>
  );
};

export default FeedbackForm;

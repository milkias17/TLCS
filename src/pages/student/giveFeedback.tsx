import SidebarContent from "../../components/SidebarContent";
import { feedback } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { makePostRequest } from "../../lib/apiClient";
import { Course } from "@prisma/client";
import Prisma from "../../lib/prisma";
import { getSession } from "../../lib/session";// @Milikiyas Please implement this part to get the user_id from the session of your auth

type Props = {
    user_id: string[];
    courses: Course[];
}

export const getServerSideProps: GetServerSideProps = async (context) => { // get courses from Enrolment
    const session = await getSession(context);
    const user_id = session?.user?.id;
    const user = await Prisma.user.findUnique({
        where: user_id,
        include: { Course: true },
    });
    const courses = user?.Course || [];

    return {
        props: {
            user_id,
            courses,
        },
    };
};



const FeedbackForm = ({ courses, user_id }: Props) => {
    const [course_code, setCourse_code] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [no_chapter_completed, setNo_chapter_completed] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const error = await makePostRequest('/api/feedback', {
            user_id,
            course_code,
            rating,
            comment,
            no_chapter_completed,
        });
        if (error) {
            setErrorMsg(error)
        }
        alert('Feedback created successfully!');
    };

    return (
        <>
            <SidebarContent>
                <form onSubmit={handleSubmit} method="post"
                    className="form-control gap-4">
                    {errorMsg && (
                        <h1 className="text-center text-3xl text-red-500 my-4">
                            {errorMsg}
                        </h1>
                    )}
                    <label htmlFor="course_code" className="input-group">
                        <span className="hidden w-1/2 sm:inline-flex" >Select Course:</span>
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
                    <label htmlFor="rating" className="input-group">
                        <span className="hidden w-1 /2 sm: inline-flex">Rating:</span>
                        <select value={rating} onChange={(e) => setRating(e.target.value)} required>
                            <option value="">Select rating</option>
                            <option value="1">1 star</option>
                            <option value="2">2 stars</option>
                            <option value="3">3 stars</option>
                            <option value="4">4 stars</option>
                            <option value="5">5 stars</option>
                        </select>
                    </label>
                    <label htmlFor="comment" className="input-group">
                        <span className="hidden w-1/2 sm:inline-flex">Comment:</span>
                        <textarea className="textarea-primary" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </label>
                    <label htmlFor="rating" className="input-group">
                        <span className="hidden w-1/2 sm:inline-flex">No. of Chapters Completed:</span>
                        <input type="number" value={no_chapter_completed} onChange={(e) => setNo_chapter_completed(e.target.value)} />
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

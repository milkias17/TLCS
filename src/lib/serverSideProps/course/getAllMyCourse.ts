import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import prisma from '../../../lib/prisma';

type Course = {
    course_code: string;
    course_name: string;
    batch: number;
    dept: string;
    chapter_length: number;
    no_week_take: number;
    description?: string;
};

type Props = {
    courses: Course[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
    context: GetServerSidePropsContext
) => {
    const { studentId } = context.query.user_id;

    try {
        const courses = await prisma.enrolment
            .findMany({
                where: {
                    user_id: studentId as string,
                },
                include: {
                    course: true,
                },
            })
            .then((enrollments) =>
                enrollments.map((enrollment) => enrollment.course)
            );

        return {
            props: { courses },
        };
    } catch (error) {
        console.error(error);
        return { props: { courses: [] } };
    }
};
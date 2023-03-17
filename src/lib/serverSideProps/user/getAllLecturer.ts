import { GetServerSideProps } from 'next';
import prisma from '../../prisma';
import { User } from '@prisma/client';

interface Props {
    lecturers: User[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        const lecturers = await prisma.user.findMany({
            where: {
                role: 'INSTRUCTOR',
            },
        });

        return {
            props: {
                lecturers,
            },
        };
    } catch (error) {
        console.error(error)
        return {
            props: {
                lecturers: [],
            },
        }
    } finally {
        await prisma.$disconnect()
    }

};

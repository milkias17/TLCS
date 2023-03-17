import { GetServerSideProps } from 'next';
import prisma from '../../prisma';
import { User } from '@prisma/client';

interface Props {
    user: User | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    const userId = params?.id as string;
    const user = await prisma.user.findUnique({
        where: {
            user_id: userId,
        },
    });

    return {
        props: {
            user,
        },
    };
};

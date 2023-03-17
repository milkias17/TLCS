import { GetServerSideProps } from 'next';
import prisma from '../../prisma';
import { User } from '@prisma/client';

interface Props {
    collgeCoordinators: User[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        const collgeCoordinators = await prisma.user.findMany({
            where: {
                role: 'COLLEGE_COORDINATOR',
            },
        });

        return {
            props: {
                collgeCoordinators,
            },
        };
    } catch (error) {
        console.error(error)
        return {
            props: {
                collgeCoordinators: [],
            },
        }
    }

};

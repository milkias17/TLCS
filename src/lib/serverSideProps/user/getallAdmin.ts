import { GetServerSideProps } from 'next';
import prisma from '../../prisma';
import { User } from '@prisma/client';

interface Props {
    admins: User[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        const admins = await prisma.user.findMany({
            where: {
                role: 'ADMIN',
            },
        });

        return {
            props: {
                admins,
            },
        };
    } catch (error) {
        console.error(error)
        return {
            props: {
                admins: [],
            },
        }
    } finally {
        await prisma.$disconnect()
    }

};

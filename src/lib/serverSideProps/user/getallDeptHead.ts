import { GetServerSideProps } from 'next';
import prisma from '../../prisma';
import { User } from '@prisma/client';

interface Props {
    deptHeads: User[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        const deptHeads = await prisma.user.findMany({
            where: {
                role: 'DEPTHEAD',
            },
        });

        return {
            props: {
                deptHeads,
            },
        };
    } catch (error) {
        console.error(error)
        return {
            props: {
                deptHeads: [],
            },
        }
    } finally {
        await prisma.$disconnect()
    }

};

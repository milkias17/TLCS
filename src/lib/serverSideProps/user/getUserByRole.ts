import { GetServerSidePropsContext } from 'next';
import prisma from '../../prisma';
import { User, UserRole } from '@prisma/client';

type Props = {
    users: User[];
};

const getServerSideProps = async (UserContext: GetServerSidePropsContext) => {
    const role = UserContext.query.role as UserRole;

    if (!Object.values(UserRole).includes(role)) {
        return {
            notFound: true,
        };
    }

    const users = await prisma.user.findMany({
        where: {
            role,
        },
    });

    return {
        props: {
            users,
        },
    };
};

export default getServerSideProps;

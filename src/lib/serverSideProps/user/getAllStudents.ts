import { GetServerSideProps } from 'next'
import { PrismaClient, User } from '@prisma/client'


type Props = {
    students: User[]
}

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        const students = await prisma.user.findMany({
            where: { role: 'STUDENT' },
        })

        return {
            props: {
                students,
            },
        }
    } catch (error) {
        console.error(error)
        return {
            props: {
                students: [],
            },
        }
    } finally {
        await prisma.$disconnect()
    }
}

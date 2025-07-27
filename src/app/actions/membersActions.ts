"use server"
import {prisma} from "@/lib/prisma";
import {auth} from "@/auth";

export async function getMembers() {
    const session = await auth();
    if (!session?.user) return null;
    try {
        return prisma.member.findMany({
            where: {
                NOT: {
                    userId: session?.user?.id
                }
            }
        });
    }catch (error) {
        console.error('Get members error:', error);
    }
}

export async function getMemberById(userId: string) {
    try {
        return await prisma.member.findUnique({where: {userId}});
    }catch (error) {
        console.error('Get member by ID error:', error);
    }
}

export async function getMembersPhotoId(userId: string) {
    const member = await prisma.member.findUnique({where: {userId}, select: {photos: true}});
    if (!member) return null;
    return member.photos;

}
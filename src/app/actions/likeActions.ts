"use server"

import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import {getAuthUserId} from "@/app/actions/authActions";

export default async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
    try {
        const userId = await getAuthUserId();

        if (isLiked) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId
                    }
                }
            })
        } else {
            await prisma.like.create({
                data: {
                    sourceUserId: userId,
                    targetUserId
                }
            })
        }

    }catch (error) {
        console.error('Toggle like member error:', error);
        throw error;
    }
}

export async function fetchCurrentUserLikeIds() {
    try {
        const userId = await getAuthUserId();
        const likesIds = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetUserId: true
            }
        });
        return likesIds.map(like => like.targetUserId);
    }catch (error) {
        console.error('Fetch current user like ids error:', error);
        throw error;
    }
}

export async function fetchLikedMembers(type = 'source') {
    try {
        const userId = await getAuthUserId();
        switch (type) {
            case 'source':
                return await fetchSourceLikes(userId);
            case 'target':
                return await fetchTargetLikes(userId);
            case 'mutual':
                return await fetchMutualLikes(userId);
            default:
                return [];
        }
    }catch (e) {
        console.error('Fetch liked members error:', e);
    }
}

async function fetchSourceLikes(userId: string) {
    const sourceList = await prisma.like.findMany({
        where: {
            sourceUserId: userId
        },
        select: {
            targetMember: true
        }
    });
    return sourceList.map(x => x.targetMember);
}

async function fetchTargetLikes(userId: string) {
    const targetList = await prisma.like.findMany({
        where: {
            targetUserId: userId
        },
        select: {
            sourceMember: true
        }
    });
    return targetList.map(x => x.sourceMember);
}

async function fetchMutualLikes(userId: string) {
    const likedUsers = await prisma.like.findMany({
        where: { sourceUserId: userId },
        select: { targetUserId: true }
    });
    const likedIds = likedUsers.map(x => x.targetUserId);
    const mutualLikes = await prisma.like.findMany({
        where: {
            AND: [
                { targetUserId: userId },
                {sourceUserId: { in: likedIds }}
            ]
        },
        select: {
            sourceMember: true
        }
    });
    return mutualLikes.map(x => x.sourceMember);
}
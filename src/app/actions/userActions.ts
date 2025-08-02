"use server"

import {memberEditSchema, MemberEditSchema} from "@/lib/schemas/memberEditSchema";
import {ActionResult} from "@/types";
import {Member, Photo} from "@/generated/prisma";
import {getAuthUserId} from "@/app/actions/authActions";
import {prisma} from "@/lib/prisma";
import {cloudinary} from "@/lib/cloudinary"; // Исправлен импорт

export async function updateMemberProfile(data: MemberEditSchema): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserId();
        const validated = memberEditSchema.safeParse(data);
        if (!validated.success) {
            return {status: 'error', message: validated.error.issues};
        }
        const {name, description, city, country} = validated.data;
        const member = await prisma.member.update({
            where: {
                userId
            },
            data: {
                name,
                description,
                city,
                country,
            }
        });
        return {status: "success", data: member}

    }catch (error) {
        console.error('Update member profile error:', error);
        return {status: 'error', message: 'An unexpected error occurred'};
    }
}

export async function addImage(url: string, publicId: string) {
    try {
        const userId = await getAuthUserId();


        return prisma.member.update({
            where: {
                userId
            },
            data: {
                photos: {
                    create: {
                        url,
                        publicId
                    }
                }
            }
        })
    }catch (error) {
        console.error('Add image error:', error);
        throw error;
    }
}

export async function setMainImage(photo: Photo) {
    try {
        const userId = await getAuthUserId();

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                image: photo.url
            }
        })
        return prisma.member.update({
            where: {
                userId
            },
            data: {
                image: photo.url
            }
        })
    }catch (e) {
        console.error('Set main image error:', e);
    }
}

export async function deleteImage(photo: Photo) {
    try {


        const userId = await getAuthUserId();


        // Проверяем, что фото существует и принадлежит пользователю
        const existingPhoto = await prisma.photo.findFirst({
            where: {
                id: photo.id,
                member: {
                    userId: userId
                }
            }
        });



        if (!existingPhoto) {
            throw new Error('Photo not found or does not belong to user');
        }


        if (photo.publicId) {
            console.log('Deleting from Cloudinary:', photo.publicId);
            try {
                const cloudinaryResult = await cloudinary.v2.uploader.destroy(photo.publicId);

            } catch (cloudinaryError) {
                console.error('Cloudinary error (continuing with DB deletion):', cloudinaryError);
            }
        } else {
            console.log('No publicId, skipping Cloudinary deletion');
        }


        const result = await prisma.member.update({
            where: {
                userId
            },
            data: {
                photos: {
                    delete: {
                        id: photo.id
                    }
                }
            },
            include: {
                photos: true
            }
        });


        return result;

    } catch (error) {

        throw error;
    }
}

export async function getUserInfoForNav() {
    try {
        const userId = await getAuthUserId();
        return await prisma.member.findUnique({
            where: {
                userId
            },
            select: {
                name: true,
                image: true
            }
        });
    }catch (error) {
        console.error('Get user info nav error:', error);
        throw error
    }
}

"use server"

import {messageSchema, MessageSchema} from "@/lib/schemas/messageSchema";
import {ActionResult} from "@/types";
import {Message} from "@/generated/prisma";
import {getAuthUserId} from "@/app/actions/authActions";
import {prisma} from "@/lib/prisma";
import {mapMessageDto} from "@/lib/mappings";

export default async function createMessages(recipientUserId: string, data: MessageSchema): Promise<ActionResult<Message>> {
    try {
        const userId = await getAuthUserId();
        const validate = messageSchema.safeParse(data);
        if (!validate.success) {
            return {status: 'error', message: validate.error.issues};
        }
        const {text} = validate.data;
        const message = await prisma.message.create({
            data: {
                text,
                recipientId: recipientUserId,
                sebderId: userId,
            }
        });
        return {status: "success", data: message}

    }catch (e) {
        console.error('Fetch messages error:', e);
        return {status: 'error', message: 'An unexpected error occurred'};
    }
}

export async function getMessageThread(recipientUserId: string) {
    try {
        const userId = await getAuthUserId();
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        sebderId: userId,
                        recipientId: recipientUserId
                    },
                    {
                        sebderId: recipientUserId,
                        recipientId: userId
                    }
                ]
            },
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                id: true,
                text: true,
                createdAt: true,
                dateRead: true,
                sender: {
                    select: {
                        userId: true,
                        name: true,
                        image: true
                    }
                },
                recipient: {
                    select: {
                        userId: true,
                        name: true,
                        image: true
                    }
                }
            }
        });
        return messages.map(message => mapMessageDto(message));

    }catch (e) {
        console.error('Fetch messages error:', e);
        return {status: 'error', message: 'An unexpected error occurred'};
    }
}
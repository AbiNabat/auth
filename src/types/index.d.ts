import {ZodIssue} from "zod";
import {Prisma} from "@/generated/prisma";

type ActionResult<T> = {status: 'success', data: T} | {status: 'error', message: string | ZodIssue[]}

type MessageRecipient =  Prisma.MessageGetPayload<{ select: {
    id: true,
    text: true,
    createdAt: true,
    dateRead: true,
    sender: {select: {userId, name, image}},
    recipient: {select: {userId, name, image}},
    } }>

type MessageDto = {
    id: string;
    senderId: string | undefined;
    dateRead: string | null;
    senderImage?: string | null | undefined;
    senderName: string | undefined;
    recipientId?: string | undefined;
    recipientImage?: string | null | undefined;
    recipientName?: string | undefined;
    text: string;
    createdAt: string | null;
}

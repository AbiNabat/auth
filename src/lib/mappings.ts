import {formatDate} from "@/lib/util";
import {MessageRecipient} from "@/types";

export function mapMessageDto(message: MessageRecipient) {
    return {
        id: message.id,
        text: message.text,
        createdAt: formatDate(message.createdAt),
        dateRead: message.dateRead ? formatDate(message.dateRead) : null,
        senderId: message.sender?.userId,
        senderName: message.sender?.name,
        senderImage: message.sender?.image,
        recipientId: message.recipient?.userId,
        recipientImage: message.recipient?.image,
        recipientName: message.recipient?.name,
    }
}
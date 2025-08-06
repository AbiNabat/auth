import React from 'react';
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "@/app/members/[userId]/chats/ChatForm";
import {getMessageThread} from "@/app/actions/messageActions";
import MessageBox from "@/app/members/[userId]/chats/MessageBox";
import {getAuthUserId} from "@/app/actions/authActions";

export default async function Chats({params} : { params: Promise<{ userId: string }>}) {
    const { userId } = await params;
    const user = await getAuthUserId();
    const messages = await getMessageThread(userId);
    const body = (
        Array.isArray(messages) && messages.length > 0 ? (
            <div>
                {messages.map(message => (
                    <MessageBox key={message.id} message={message} currentUserId={user}/>
                ))}
            </div>
        ) : (
            <div>Сообщений пока нет</div>
        )
    );



    return (
        <>
            <CardInnerWrapper header='Chats' body={body} footer={<ChatForm />} />
        </>
    );
}


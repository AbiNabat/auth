import React from 'react';
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "@/app/members/[userId]/chats/ChatForm";

export default function Page() {
    return (
        <>
       <CardInnerWrapper header='Chats' body={<div>Chats go here</div>} footer={<ChatForm />} />

        </>
    );
}

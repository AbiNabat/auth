"use client"

import React from 'react';
import {MessageDto} from "@/types";
import clsx from "clsx";
import {Avatar} from "@heroui/react";

type Props = {
    message: MessageDto;
    currentUserId: string;
}

export default function MessageBox({message, currentUserId}: Props) {
    const isCurrentUserSender = message.senderId === currentUserId;

    const renderAvatar = () => (
        <Avatar
            name={message.senderName}
            src={message.senderImage || '/images/user.png'}
            className='self-end'
        />
    );

    const messageContentClasses = clsx('flex flex-col w-[50%] px-2 py-1', {
        'rounded-l-xl rounded-tr-xl text-white bg-blue-100 ': isCurrentUserSender,
        'rounded-r-xl rounded-tl-xl text-black bg-green-100': !isCurrentUserSender,
    });

    const renderMessageHeader = () => (
        <div className={clsx('flex items-center w-full', {
            'justify-between' : isCurrentUserSender,
            'justify-end': !isCurrentUserSender,
        })}>
            {message.dateRead && message.recipientId !== currentUserId ? (
                <span className='text-xs text-black text-italic'>(read 4 min ago)</span>
            ): <div className='w-2 h-2 bg-green-500 rounded-full' />}
            <div className='flex '>
                <span className='text-sm  text-gray-900'>{message.senderName}</span>
                <span className='text-sm  text-gray-500 ml-2'>{message.createdAt}</span>
            </div>
        </div>
    )

    const renderMessageContent = () => (
        <div className={messageContentClasses}>
            {renderMessageHeader()}
            <span className='text-sm  font-semibold text-gray-800'>{message.senderName}</span>

        </div>
)

    return (
        <div className='grid grid-rows-1'>
            <div className={clsx('flex gap-2 mb-3', {
                'justify-end text-right': isCurrentUserSender,
                'justify-start': !isCurrentUserSender
            })}>
                {!isCurrentUserSender ? renderAvatar() : null}

                    {renderMessageContent()}
                {isCurrentUserSender && renderAvatar()}
            </div>
        </div>
    );
}

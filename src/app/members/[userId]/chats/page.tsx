import React from 'react';
import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";

export default async function Chats() {
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Chats
            </CardHeader>
            <Divider />

            <CardBody>
               Chats here
            </CardBody>
        </>
    );
}


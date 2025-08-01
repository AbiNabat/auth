import React from 'react';
import {getMemberById} from "@/app/actions/membersActions";
import MemberSidebar from "@/app/members/MemberSidebar";
import {Card} from "@heroui/card";

export default async function Layout({children, params}: { children: React.ReactNode, params: { userId: string }}) {
    const { userId } = await params;
    const member = await getMemberById(userId);
    if (!member) {
        return <div>Member not found</div>
    }
    const basePath = `/members/${member.userId}`;
    const navLinks = [
        {name: 'Profile', href: `${basePath}`},
        {name: 'Photos', href: `${basePath}/photos`},
        {name: 'Chats', href: `${basePath}/chats`},
    ];
    return (
        <div className='grid grid-cols-12 gap-5 h-[80vh]'>
            <div className='col-span-3'>
                <MemberSidebar member={member} navLinks={navLinks} />
            </div>
            <div className='col-span-9'>
                <Card className='w-full mt-10 h-[80vh]'>
                    {children}
                </Card>
            </div>
        </div>
    );
}


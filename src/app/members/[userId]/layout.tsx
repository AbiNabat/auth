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
    return (
        <div className='grid grid-cols-12 gap-5 h-[80vh]'>
            <div className='col-span-3'>
                <MemberSidebar member={member} />
            </div>
            <div className='col-span-9'>
                <Card className='w-full mt-10 h-[80vh]'>
                    {children}
                </Card>
            </div>
        </div>
    );
}


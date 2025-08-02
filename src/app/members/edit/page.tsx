import React from 'react';
import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";
import EditForm from "@/app/members/edit/EditForm";
import {getAuthUserId} from "@/app/actions/authActions";
import {getMemberById} from "@/app/actions/membersActions";

export default async function MemberEditPage() {
    const userId = await getAuthUserId();
    const member = await getMemberById(userId);
    if (!member) return <div>Member not found</div>;
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Edit Member
            </CardHeader>
            <Divider />
            <CardBody>
                <EditForm member={member} />
            </CardBody>

        </>
    );
}


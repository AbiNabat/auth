import React from 'react';
import {Member} from "@/generated/prisma";
import {Card, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
import Link from "next/link";
import {calculateAge} from "@/lib/util";
type Props = {
    member: Member;
}

export default function MemberCard({member}: Props) {
    return (
        <>
        <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
            <Image isZoomed width={300} alt={member.name} src={member.image || '/images/user.png'} className='aspect-square object-cover' />
            <CardFooter className='flex justify-start bg-linear-65 from-purple-300 to-pink-300  overflow-hidden absolute bottom-0 z-10'>
                <div className='flex flex-col text-white '>
                    <span className='text-xl font-semibold'>{member.name}, {calculateAge(member.dateOfBirth)}</span>
                    <span className='text-sm'>{member.city}</span>
                </div>
            </CardFooter>
        </Card>

        </>
    );
}

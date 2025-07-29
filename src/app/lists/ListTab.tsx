"use client"

import React, {Key} from 'react';
import {Member} from "@/generated/prisma";
import {Tab, Tabs} from "@heroui/tabs";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import MemberCard from "@/app/members/MemberCard";

type Props = {
    members: Member[],
    likeIds: string[]
}



export default function ListTab({members, likeIds}: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const tabs = [
        {id: 'source', label: 'Members i Liked'},
        {id: 'target', label: 'Members thet liked me'},
        {id: 'mutual', label: 'Mutual likes'},
    ]
    function handleTabChange(key: Key) {
        const params = new URLSearchParams(searchParams);
        params.set('type', key.toString());
        router.replace(`${pathname}?${params.toString()}`)
    }
    return (
        <div className='flex flex-col mt-10 gap-5'>
            <Tabs aria-label='Liked Tabs' items={tabs} color='secondary' onSelectionChange={(key) => handleTabChange(key)}>
                {(item) => (
                    <Tab key={item.id} title={item.label} >
                        {members.length > 0 ? (
                            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
                                {members.map(member => (
                                    <MemberCard member={member} key={member.id} likeIds={likeIds} ></MemberCard>
                                ))}
                            </div>
                        ): (
                            <div>No members</div>
                        )}
                    </Tab>
                )}
            </Tabs>
        </div>
    );
}

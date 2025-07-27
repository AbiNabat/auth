"use client"
import React from 'react';
import {Session} from "next-auth";
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@heroui/dropdown";
import {Avatar} from "@heroui/react";
import Link from "next/link";
import {signOut} from "@/auth";
import {signOutUser} from "@/app/actions/authActions";
type Props = {
    user: Session['user']
}

export default function UserMenu({user}: Props) {
    return (
        <>
        <Dropdown placement='bottom-end'>
            <DropdownTrigger>
                <Avatar isBordered as='button' className='transition-transform' color='secondary' name={user?.name || 'user avatar'} size='sm' src={user?.image || '/images/user.png'}/>
            </DropdownTrigger>
            <DropdownMenu variant='flat' className='w-48' aria-label='User ment'>
                <DropdownSection showDivider>
                    <DropdownItem key={1} isReadOnly className='h-14 flex flex-row' aria-label='User menu'>
                        Signed in as {user?.name}
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem key={2} as={Link} href='/members/edit' className='h-14 flex flex-row' aria-label='Edit'>Edit profile</DropdownItem>
                <DropdownItem key={3} color='danger' onPress={() =>signOutUser()} aria-label='Logout'>Logout</DropdownItem>

            </DropdownMenu>
        </Dropdown>
        </>
    );
}


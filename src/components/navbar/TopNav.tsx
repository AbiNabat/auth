import React from 'react';
import {Navbar, NavbarBrand, NavbarContent} from "@heroui/navbar";
import {GiMatchTip} from "react-icons/gi";
import Link from "next/link";
import {Button} from "@heroui/button";
import NavLink from "@/components/navbar/NavLink";
import {auth} from "@/auth";
import UserMenu from "@/components/navbar/UserMenu";

export default async function TopNav() {
    const session = await auth();

    return (
        <Navbar maxWidth='xl' className='bg-gradient-to-r from-pink-400 to-purple-700'
                classNames={{ item: ['text-xl', 'text-white', 'uppercase', 'data-[active=true]: text-yellow-100']}}>
            <NavbarBrand>
                <GiMatchTip size={40} className='text-gray-200'/>
                <div className='font-bold text-3xl flex'>
                    <span className='text-gray-900 '>Next</span>
                    <span className='text-gray-200'>App</span>
                </div>
            </NavbarBrand>
            <NavbarContent justify='center'>
               <NavLink    href='/' label='Home' />
                <NavLink   href='/members' label='Members' />
                <NavLink   href='/messages' label='Messages' />
                <NavLink   href='/lists' label='Lists' />


            </NavbarContent>
            <NavbarContent justify='end'>
                {session?.user ? (
                    <UserMenu user={session.user}/>
                ): (
                    <>
                        <Button as={Link} href='/auth/login' variant='bordered'className='text-white'>Login</Button>
                        <Button as={Link} href='/auth/register'  variant='bordered' className='text-white'>Register</Button>
                    </>
                )}

            </NavbarContent>
        </Navbar>
    );
}


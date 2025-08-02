'use client'
import {Member} from "@/generated/prisma";
import {Card, CardBody, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
import {calculateAge} from "@/lib/util";
import {Divider} from "@heroui/divider";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Button} from "@heroui/button";

type Props = {
    member: Member;
    navLinks: {name: string, href:string}[];
}
export default function MemberSidebar({member, navLinks}: Props) {
    const pathName = usePathname();

    return (
        <>
        <Card className='w-full mt-10 items-center h-[800vh]'>
            <Image
            height={200}
            width={200}
            src={member.image || '/images/user.png'}
            alt={member.name}
            />
            <CardBody>
                <div className='flex flex-col items-center'>
                    <div className='text-2xl'>
                        {member.name}, {calculateAge(member.dateOfBirth)}
                    </div>
                    <div className='text-sm text-neutral-500'>
                        {member.city}, {member.country}
                    </div>
                </div>
                <Divider/>
                <nav className='flex flex-col p-4 ml-4 text-2xl gap-2'>
                    {navLinks.map(({name, href}) => (
                        <Link href={href} key={name} className={`block rounded-2xl ${pathName === href ? 'text-secondary' : 'hover: text-secondary/50'}`}>{name}</Link>
                    ))}
                </nav>
            </CardBody>
            <CardFooter>
                <Button as={Link} href='/members' fullWidth color='secondary' variant='bordered'>Back</Button>
            </CardFooter>
        </Card>

        </>
    )
}
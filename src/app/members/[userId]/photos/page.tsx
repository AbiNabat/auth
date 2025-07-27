import React from 'react';
import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";
import {getMembersPhotoId} from "@/app/actions/membersActions";
import {Image} from "@heroui/image";

export default async function Photos({params}: { params: { userId: string }}) {
    const { userId } = await params;
    const photos = await getMembersPhotoId(userId);

    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Photos
            </CardHeader>
            <Divider />

            <CardBody>
                <div className='grid grid-cols-5 gap-3'>
                    {photos && photos.map(photo => (
                        <div key={photo.id}>
                            <Image src={photo.url} alt={photo.id} width={300}  className='object-cover aspect-square' />
                        </div>
                    ))}
                </div>
            </CardBody>
        </>
    );
}

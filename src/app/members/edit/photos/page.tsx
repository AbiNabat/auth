import React from 'react';
import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";
import {getAuthUserId} from "@/app/actions/authActions";
import {getMembersPhotoId} from "@/app/actions/membersActions";
import {Image} from "@heroui/image";
import StarButton from "@/components/StarButton";
import DeleteButton from "@/components/DeleteButton";
import ImageUploadButton from "@/components/ImageUploadButton";
import MemberPhotoUpload from "@/app/members/edit/photos/MemberPhotoUpload";

export default async function PhotosPage() {
    const userId = await getAuthUserId();
    const photos = await getMembersPhotoId(userId);


    return (
        <>
        <CardHeader className='text-2xl font-semibold text-secondary'>
            Edit Photo
        </CardHeader>
            <Divider />
            <CardBody>
                <MemberPhotoUpload />
                <div className='grid grid-cols-5 gap-3 p-5'>
                    {photos && photos.map(photo => (
                        <div key={photo.id} className='relative'>
                            <Image src={photo.url} alt={photo.id} width={300}  className='object-cover aspect-square' />
                            <div className='absolute top-3 left-3 z-50'>
                                <StarButton selected={false} loading={false} />
                            </div>
                            <div className='absolute top-3 right-3 z-50'>
                                <DeleteButton loading={false} />
                            </div>
                        </div>
                    ))}

                </div>
            </CardBody>
        </>
    );
}


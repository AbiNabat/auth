import React from 'react';
import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/divider";
import {getAuthUserId} from "@/app/actions/authActions";
import {getMemberById, getMembersPhotoId} from "@/app/actions/membersActions";
import {Image} from "@heroui/image";
import StarButton from "@/components/StarButton";
import DeleteButton from "@/components/DeleteButton";
import ImageUploadButton from "@/components/ImageUploadButton";
import MemberPhotoUpload from "@/app/members/edit/photos/MemberPhotoUpload";
import {Photo} from "@/generated/prisma";
import MemberPhotos from "@/components/MemberPhotos";

export default async function PhotosPage() {
    const userId = await getAuthUserId();
    const member = await getMemberById(userId);
    const photos = await getMembersPhotoId(userId);


    return (
        <>
        <CardHeader className='text-2xl font-semibold text-secondary'>
            Edit Photo
        </CardHeader>
            <Divider />
            <CardBody>
                <MemberPhotoUpload />
                <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image} />
            </CardBody>
        </>
    );
}


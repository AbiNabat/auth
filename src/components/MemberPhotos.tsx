"use client"

import React, {useState} from 'react';
import {Image} from "@heroui/image";
import StarButton from "@/components/StarButton";
import DeleteButton from "@/components/DeleteButton";
import {Photo} from "@/generated/prisma";
import {useRouter} from "next/navigation";
import {deleteImage, setMainImage} from "@/app/actions/userActions";


type Props = {
    photos: Photo[] | null;
    editing?: boolean;
    mainImageUrl?: string | null;

}


export default function MemberPhotos({photos, editing, mainImageUrl}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState({
        type: '',
        isLoading: false,
        id: ''
    });
    const onSetMainImage = async (photo: Photo) => {
        if (photo.url === mainImageUrl) return null;
        setLoading({isLoading: true, type: 'main', id: photo.id});
        await setMainImage(photo);
        router.refresh();
        setLoading({isLoading: false, type: '', id: ''});
    }

    const onDeletePhoto = async (photo: Photo) => {
        if (photo.url === mainImageUrl) return null;
        setLoading({isLoading: true, type: 'delete', id: photo.id});
        await deleteImage(photo);
        router.refresh();
        setLoading({isLoading: false, type: '', id: ''});
    }

    return (
        <div className='grid grid-cols-5 gap-3 p-5'>
            {photos && photos.map(photo => (
                <div key={photo.id} className='relative'>
                    <Image src={photo.url} alt={photo.id} width={300}  className='object-cover aspect-square' />
                    {editing && (
                        <>
                            <div className='absolute top-3 left-3 z-50' onClick={() => onSetMainImage(photo)} >
                                <StarButton selected={photo.url === mainImageUrl} loading={false} />
                            </div>
                            <div className='absolute top-3 right-3 z-50' onClick={() => onDeletePhoto(photo)}>
                                <DeleteButton loading={loading.isLoading && loading.type === 'delete' && loading.id === photo.id} />
                            </div>
                        </>
                    )}

                </div>
            ))}

        </div>

    );
}


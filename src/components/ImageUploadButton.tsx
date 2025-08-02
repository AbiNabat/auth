"use client"

import React from 'react';
import {CldUploadButton, CloudinaryUploadWidgetResults} from "next-cloudinary";
import {HiPhoto} from "react-icons/hi2";



type Props = {
    onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
}
export default function ImageUploadButton({onUploadImage}: Props) {
    return (
        <div>
            <CldUploadButton
                options={{maxFiles: 1}}
                onSuccess={(res) => {onUploadImage(res)}}
                signatureEndpoint='/api/sign-image'
                uploadPreset='dote'
                className='flex items-center gap-2 bg-secondary text-white rounded-lg p-2 px-4 hover:bg-secondary/70 opacity-80 transition cursor-pointer'
            >
                <HiPhoto size={24} />
                <span>Upload Image</span>
            </CldUploadButton>
        </div>
    );
}


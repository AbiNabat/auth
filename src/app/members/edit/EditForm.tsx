"use client"

import React, {useEffect} from 'react';
import {Member} from "@/generated/prisma";
import {useForm} from "react-hook-form";
import {MemberEditSchema, memberEditSchema} from "@/lib/schemas/memberEditSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input, Textarea} from "@heroui/input";
import {Button} from "@heroui/button";
import {updateMemberProfile} from "@/app/actions/userActions";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

type Props = {
    member: Member;
}

export default function EditForm({member}: Props) {
    const router = useRouter();
    const {register, handleSubmit,reset, setError, formState: {isValid, isDirty, isSubmitting, errors}} = useForm<MemberEditSchema>({
        resolver: zodResolver(memberEditSchema),
        mode: 'onTouched'
    });
    useEffect(() => {
        if (member) {
            reset({
                name: member.name,
                description: member.description,
                city: member.city,
                country: member.country
            });
        }
    }, [member, reset])
    const onSubmit = async (data:MemberEditSchema) => {
       const result = await updateMemberProfile(data);
       if (result.status === 'success') {
           toast.success('Profile updated successfully');
           router.refresh()
           reset({...data})
       }else {
           toast.error('An error occurred while updating profile');
       }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
                <Input label='Name' variant='bordered' {...register('name')} defaultValue={member.name} isInvalid={!!errors.name}  errorMessage={errors.name?.message }  />
                <Textarea className='mt-5' label='Description' variant='bordered' {...register('description')} defaultValue={member.description} isInvalid={!!errors.description} errorMessage={errors.description?.message } minRows={6}  />


                <div className='flex flex-row gap-5'>
                    <Input label='City' variant='bordered' {...register('city')} defaultValue={member.city} isInvalid={!!errors.city} errorMessage={errors.city?.message }  />
                    <Input label='Country' variant='bordered' {...register('country')} defaultValue={member.country} isInvalid={!!errors.country} errorMessage={errors.country?.message }  />

                </div>
                <Button type='submit' className='flex self-end mt-5' variant='solid' isDisabled={!isValid || !isDirty} isLoading={isSubmitting} color='secondary'>Save</Button>
            </form>
        </>
    );
}


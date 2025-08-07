"use client"

import React from 'react';
import {useForm} from "react-hook-form";
import {messageSchema, MessageSchema} from "@/lib/schemas/messageSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {HiPaperAirplane} from "react-icons/hi2";
import {useParams, useRouter} from "next/navigation";
import createMessages from "@/app/actions/messageActions";
import {handleFormServerErrors} from "@/lib/util";
import {toast} from "react-toastify";

export default function ChatForm() {
    const router = useRouter();
    const params = useParams<{userId: string}>()
    const {register, handleSubmit, reset, setError, formState: {isSubmitting, isValid, errors}} = useForm<MessageSchema>({
        resolver: zodResolver(messageSchema)
    });


    const onSubmit = async (data: MessageSchema) => {
        const result = await createMessages(params.userId, data);
        if (result.status === 'error') {
            handleFormServerErrors({error: result.message}, setError)
        } else {
            reset({text: ''});
            router.refresh();
            toast.success('Message sent successfully');
        }
    }
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-row gap-2'>
            <div className='w-full flex items-center gap-2'>
                <Input fullWidth placeholder="type message" variant='faded' {...register('text')} isInvalid={!!errors.text} errorMessage={errors.text?.message}  />
                <Button type='submit' isIconOnly color='secondary' radius='full' isLoading={isSubmitting} isDisabled={!isValid || isSubmitting}> <HiPaperAirplane size={18}/> </Button>
            </div>
            <div className='flex flex-col'>
                {errors.root?.serverError && <p className='text-red-500'>{errors.root?.serverError.message}</p>}
            </div>

        </form>
        </>
    );
}


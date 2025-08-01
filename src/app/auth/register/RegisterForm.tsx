"use client"
import React from 'react';
import {Card, CardBody, CardHeader} from "@heroui/card";
import {Gi3dHammer} from "react-icons/gi";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema, RegisterSchema} from "@/lib/schemas/registerSchema";
import {registerUser} from "@/app/actions/authActions";

export default function RegisterForm() {
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm<RegisterSchema>({/*resolver: zodResolver(registerSchema),*/ mode: 'onTouched'});
    const onSubmit = async (data:RegisterSchema) => {
        const result = await registerUser(data);
        if (result.status === 'success') {
            console.log('User registered successfully');
        } else {
            if (Array.isArray(result.message)) {
                result.message.forEach((e) => {
                    const fieldName = e.path.join('.') as 'name' | 'email' | 'password';
                    setError(fieldName, {message: e.message});
                });
            }else {
                setError('root.serverError', {message: result.message});
            }
        }
    }
    return (
        <>
            <Card className='w-2/5 mx-auto'>
                <CardHeader className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center text-secondary'>
                        <div className='flex flex-row items-center gap-3'>
                            <Gi3dHammer size={30} />
                            <h1 className='text-3xl'>Register</h1>
                        </div>
                        <p className='text-neutral-500'> Welcome to our app</p>

                    </div>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-4'>
                            <Input label='Name'  variant='bordered' {...register('name')} defaultValue='' isInvalid={!!errors.name} errorMessage={errors.name?.message } />
                            <Input label='Email'  variant='bordered' {...register('email')} defaultValue='' isInvalid={!!errors.email} errorMessage={errors.email?.message } />
                            <Input label='Password' type='password'  variant='bordered' {...register('password')} defaultValue='' isInvalid={!!errors.password} errorMessage={errors.password?.message} />
                            {errors.root?.serverError && <p className='text-red-500'>{errors.root?.serverError.message}</p>}
                            <Button isDisabled={!isValid} fullWidth color='secondary' type='submit'>Register</Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </>
    );
}


"use server"

import {registerSchema, RegisterSchema} from "@/lib/schemas/registerSchema";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import {ActionResult} from "@/types";
import {User} from "@/generated/prisma";
import {LoginSchema} from "@/lib/schemas/loginSchema";
import {signIn, signOut} from "@/auth";
import {AuthError} from "next-auth";


export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
 try {
     const result = await  signIn('credentials', {
         email: data.email,
         password: data.password,
         redirect: false,
     });
     console.log(result);
     return {status: "success", data: 'Logged in successfully'}
 }catch (error) {
     console.error('Sign in error:', error);
     if (error instanceof AuthError) {
        switch (error.type) {
            case 'CredentialsSignin':
                return {status: 'error', message: 'Invalid credentials'};

            default:
                return {status: 'error', message: 'An unexpected error occurred'};
        }
     }else {
         return {status: 'error', message: 'An unexpected error occurred'};
     }
 }
}

export async function signOutUser() {
    return await signOut({redirectTo: '/'});
}
export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = await registerSchema.safeParse(data);
        if (!validated.success) {
            return {status: 'error', message: validated.error.issues};
        }

        const {name, email, password} = validated.data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await prisma.user.findUnique({where: {email}});

        if (existingUser) {
            return {status: 'error', message: 'User already exists'};
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword
            }
        });

        return {status: 'success', data: user};

    } catch (error) {
        console.error('Registration error:', error);
        return {status: 'error', message: 'An unexpected error occurred'};
    }
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({where: {email}});
}

export async function getUserById(id: string): Promise<User | null> {
    try {
        return await prisma.user.findUnique({where: {id}});
    } catch (error) {
        console.error('Get user by ID error:', error);
        return null;
    }
}
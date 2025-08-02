import { z } from 'zod';
export const memberEditSchema = z.object({
    name: z.string().min(1, { message: 'Name must be at least 1 character' }),
    description: z.string().min(1, { message: 'Description must be at least 1 character' }),
    city: z.string().min(1, { message: 'City must be at least 1 character' }),
    country: z.string().min(1, { message: 'Country must be at least 1 character' }),

});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
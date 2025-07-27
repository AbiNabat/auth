import { PrismaClient } from "@/generated/prisma"; // Используем правильный путь из схемы
import { membersData } from "./membersData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMembers() {
    const memberPromises = membersData.map(async member => {
        const hashedPassword = await hash('passwordsQwe123', 10);

        // Создаем User с связанным Member
        return prisma.user.create({
            data: {
                email: member.email,
                emailVerified: new Date(),
                name: member.name,
                passwordHash: hashedPassword,
                image: member.image,
                members: { // Это связь с Member из схемы
                    create: {
                        name: member.name,
                        gender: member.gender,
                        dateOfBirth: new Date(member.dateOfBirth),
                        created: new Date(member.created),
                        updated: new Date(member.lastActive),
                        description: member.description,
                        city: member.city,
                        country: member.country,
                        image: member.image,
                        photos: {
                            create: {
                                url: member.image,
                            }
                        }
                    }
                }
            }
        });
    });

    return Promise.all(memberPromises);
}

async function main() {
    console.log('Starting seeding...');
    await seedMembers();
    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

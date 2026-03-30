import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;
    const username = process.env.SEED_ADMIN_USERNAME || 'admin';

    if (!email || !password) {
        throw new Error(
            'Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD in environment variables.'
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = await prisma.user.upsert({
        where: { email },
        update: {
            passwordHash: hashedPassword,
            isAdmin: true,
            canPost: true,
            displayname: username,
        },
        create: {
            email,
            passwordHash: hashedPassword,
            displayname: username,
            isAdmin: true,
            canPost: true,
        },
    });

    console.log(`Admin user ready: ${adminUser.email}`);
}

main()
    .catch((err) => {
        console.error('Failed to create admin user:', err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
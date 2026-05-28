import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin account
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@itc.com' },
    update: {},
    create: {
      name: 'Admin ITC',
      email: 'admin@itc.com',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log(`✅ Admin created: ${admin.email} (ID: ${admin.id})`);

  // Create demo member account
  const userPassword = await bcrypt.hash('user123', 10);
  const member = await prisma.user.upsert({
    where: { email: 'user@itc.com' },
    update: {},
    create: {
      name: 'Siswa Demo',
      email: 'user@itc.com',
      password: userPassword,
      role: 'member',
    },
  });
  console.log(`✅ Member created: ${member.email} (ID: ${member.id})`);

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

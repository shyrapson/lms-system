const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  console.log('seeding category database');
  try {
    await database.category.createMany({
      data: [
        { name: 'Computer Science' },
        { name: 'Mathematics' },
        { name: 'Music' },
        { name: 'Fitness' },
        { name: 'Photography' },
        { name: 'Accounting' },
        { name: 'Filming' },
      ],
    });
    console.log('categories seeded successfully');
  } catch (error) {
    console.log('Error seeding the database category', error);
  } finally {
    await database.$disconnect;
  }
}

main();

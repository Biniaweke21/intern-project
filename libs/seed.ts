import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: "user1@example.com", name: "User One", password: "password1" },
    { email: "user2@example.com", name: "User Two", password: "password2" },
    { email: "user3@example.com", name: "User Three", password: "password3" },
    { email: "user4@example.com", name: "User Four", password: "password4" },
    { email: "user5@example.com", name: "User Five", password: "password5" },
  ];

  // Use forEach to create users one by one
  await Promise.all(
    users.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      await prisma.user.create({
        data: user,
      });
    })
  );

  console.log("Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

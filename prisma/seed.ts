import { prisma } from "@server/libs/prisma-client";

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "admin@admin.com",
        name: "Admin Admin",
        password: "password1",
        role: "ADMIN",
      },
      {
        email: "user2@example.com",
        name: "User Two",
        password: "password2",
        role: "ADMIN",
      },
      {
        email: "user3@example.com",
        name: "User Three",
        password: "password3",
        role: "HMR",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

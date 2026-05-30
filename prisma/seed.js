import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  const email = "ayeshansari124@gmail.com"; 
  const password = await bcrypt.hash("ayesha", 10);

  const existing = await prisma.user.findUnique({
    where: { email }
  });

  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const admin = await prisma.user.create({
    data: {
      email,
      password,
      role: "ADMIN"
    }
  });

  console.log("Admin created:", admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
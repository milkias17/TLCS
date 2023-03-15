import prisma from "./lib/prisma";
import { hashPassword } from "./lib/passwordHandlers";
import { UserRole } from "@prisma/client";

const names = ["Abebe", "Kebede", "Nahom", "Mohammed", "Meseret"];

const randomNum = Math.floor(Math.random() * 5);

async function main() {
  for (let i = 0; i < 100; i++) {
    let randomNum = Math.floor(Math.random() * 5);
    let secondNum = Math.floor(Math.random() * 5);
    let firstName = names[randomNum];
    let secondName = names[secondNum];
    const user = await prisma.user.create({
      data: {
        password: await hashPassword("test"),
        fname: firstName,
        lname: secondName,
        email: `${firstName}_i@gmail.com`,
        role: UserRole.STUDENT,
      },
    });
    console.log(`Created User: ${JSON.stringify(user)}`);
  }
}

main().then(() => {
  console.log("Done!");
});

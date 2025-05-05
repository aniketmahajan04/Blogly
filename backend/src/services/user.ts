import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db";
import { AuthProvider } from "@prisma/client";

export interface UserInterface {
  email: string;
  password: string;
  name: string;
}

class UserService {

  public static createUser(user: UserInterface){
      const { email, password, name } = user;
      const salt = randomBytes(32).toString();
      const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
      return prismaClient.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          salt,
          provider: AuthProvider.EMAIL
        }
      })
  }
}

export default UserService;

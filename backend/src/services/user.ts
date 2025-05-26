import JWT from 'jsonwebtoken';
import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db";
import { AuthProvider } from "@prisma/client";
import { JWT_SECRET } from "../config";

export interface UserInterface {
  email: string;
  password: string;
  name: string;
}



export interface GetUserByToken {
  email: string;
  password: string;
}

class UserService {

  public static generateHash(salt: string, password: string) {

      const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");

      return hashedPassword;
  }

  public static createUser(user: UserInterface){
      const { email, password, name } = user;
      const salt = randomBytes(32).toString("hex");
      const hashedPassword = UserService.generateHash(salt, password);

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

  public static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({
      where: {
        email
      }
    })
  }
  
  public static async getUserByToken(paylod: GetUserByToken){
    const { email, password } = paylod;
    const user = await UserService.getUserByEmail(email);
    if(!user) {
      throw new Error("User not found");
    }

    const userSalt = user.salt;
    if(!userSalt) {
      throw new Error("User salt not found")
    }

    const userHashedPassword = UserService.generateHash(userSalt, password);

    if(userHashedPassword !== user.password) {
      throw new Error("Invalid password");
    }

    const token = JWT.sign({id: user.id}, JWT_SECRET);
    return token;

  }

  public static decodeJWTToken(token: string) {
    return  JWT.verify(token, JWT_SECRET);
  }

  public static checkContext(context: { id: string }) {
    if(!context.id) {
      throw new Error("Please login");
    }
  }

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({
      where: {
        id
      },
      include:{
        posts: true
      }
    })
  }
}

export default UserService;

// Prisma is an object relational mapper, so we don't need to use database directly with raw SQL calls
// It makes database easier to understand and migrate and automatically generates prisma client which allows us to access our database in JavaScript with IntelliSense based on our model

// Import the PrismaClient, initialize it and export it as a variable so we can use it elsewhere
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

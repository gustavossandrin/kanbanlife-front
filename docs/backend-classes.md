// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum TaskColor {
  YELLOW
  GREEN
  BLUE
  RED
  CYAN
  PURPLE
  ORANGE
  MAGENTA
}

model User {
  id        String    @id @default(uuid()) @db.Uuid
  email     String    @unique @db.VarChar(255)
  password  String    @db.VarChar(255)
  firstName String    @db.VarChar(255)
  lastName  String    @db.VarChar(255)
  photo     String?
  projects  Project[]
  createdAt DateTime  @default(now()) @db.Timestamptz
  updatedAt DateTime  @updatedAt @db.Timestamptz
}

model Project {
  id        String   @id @default(uuid()) @db.Uuid
  name      String   @db.VarChar(255)
  user      User     @relation(fields: [userId], references: [id])
  userId    String   @db.Uuid
  columns   Column[]
  createdAt DateTime @default(now()) @db.Timestamptz
  updatedAt DateTime @updatedAt @db.Timestamptz
}

model Column {
  id        String   @id @default(uuid()) @db.Uuid
  name      String   @db.VarChar(255)
  maxTasks  Int      @default(0)
  position  Int      @default(0)
  project   Project  @relation(fields: [projectId], references: [id])
  projectId String   @db.Uuid
  tasks     Task[]
  createdAt DateTime @default(now()) @db.Timestamptz
  updatedAt DateTime @updatedAt @db.Timestamptz
}

model Task {
  id          String    @id @default(uuid()) @db.Uuid
  title       String    @db.VarChar(100)
  description String?   @db.VarChar(500)
  position    Int       @default(0)
  color       TaskColor
  column      Column    @relation(fields: [columnId], references: [id])
  columnId    String    @db.Uuid
  labels      Label[]
  createdAt   DateTime  @default(now()) @db.Timestamptz
  updatedAt   DateTime  @updatedAt @db.Timestamptz
}

model Label {
  id        String   @id @default(uuid()) @db.Uuid
  title     String   @db.VarChar(255)
  tasks     Task[]
  createdAt DateTime @default(now()) @db.Timestamptz
  updatedAt DateTime @updatedAt @db.Timestamptz
}

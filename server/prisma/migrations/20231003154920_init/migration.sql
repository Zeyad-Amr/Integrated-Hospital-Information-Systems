-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "ssn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

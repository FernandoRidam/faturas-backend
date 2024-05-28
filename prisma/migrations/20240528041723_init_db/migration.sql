-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "installation" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "referenceMonth" TIMESTAMP(3) NOT NULL,
    "electricityKwh" INTEGER NOT NULL,
    "electricityValue" DOUBLE PRECISION NOT NULL,
    "energySCEEKwh" INTEGER NOT NULL,
    "energySCEEValue" DOUBLE PRECISION NOT NULL,
    "energyGDIKwh" INTEGER NOT NULL,
    "energyGDIValue" DOUBLE PRECISION NOT NULL,
    "contribution" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "maturity" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_number_key" ON "Client"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Client_installation_key" ON "Client"("installation");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

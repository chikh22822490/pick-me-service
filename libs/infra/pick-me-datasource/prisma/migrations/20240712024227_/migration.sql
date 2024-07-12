-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookedSeats" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_id_key" ON "Reservation"("id");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

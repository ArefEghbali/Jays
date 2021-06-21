/*
  Warnings:

  - You are about to drop the `OrderElement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderElement" DROP CONSTRAINT "OrderElement_orderid_fkey";

-- DropForeignKey
ALTER TABLE "OrderElement" DROP CONSTRAINT "OrderElement_pid_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "orderId" TEXT;

-- DropTable
DROP TABLE "OrderElement";

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

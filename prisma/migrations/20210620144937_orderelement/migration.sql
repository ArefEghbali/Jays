/*
  Warnings:

  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `poid` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ProductForOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_poid_fkey";

-- DropForeignKey
ALTER TABLE "ProductForOrder" DROP CONSTRAINT "ProductForOrder_orderid_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "poid";

-- DropTable
DROP TABLE "ProductForOrder";

-- CreateTable
CREATE TABLE "OrderElement" (
    "id" TEXT NOT NULL,
    "orderid" TEXT NOT NULL,
    "pid" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderElement" ADD FOREIGN KEY ("orderid") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderElement" ADD FOREIGN KEY ("pid") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

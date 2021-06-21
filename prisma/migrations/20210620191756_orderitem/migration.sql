-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderItemId_fkey";

-- DropIndex
DROP INDEX "Product_orderItemId_unique";

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD FOREIGN KEY ("productid") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

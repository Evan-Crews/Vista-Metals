/*
  Warnings:

  - You are about to drop the column `qty` on the `LineItem` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `LineItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LineItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lineNumber" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" REAL NOT NULL,
    "requestedDate" DATETIME NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "LineItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LineItem" ("id", "itemName", "lineNumber", "orderId", "requestedDate", "unitPrice") SELECT "id", "itemName", "lineNumber", "orderId", "requestedDate", "unitPrice" FROM "LineItem";
DROP TABLE "LineItem";
ALTER TABLE "new_LineItem" RENAME TO "LineItem";
CREATE UNIQUE INDEX "LineItem_orderId_lineNumber_key" ON "LineItem"("orderId", "lineNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

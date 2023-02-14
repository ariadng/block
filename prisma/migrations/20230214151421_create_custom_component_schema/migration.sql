-- CreateTable
CREATE TABLE "CustomComponent" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomComponent_slug_key" ON "CustomComponent"("slug");

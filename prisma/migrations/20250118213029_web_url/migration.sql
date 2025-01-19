-- CreateTable
CREATE TABLE "Url" (
    "urlId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "shortenedUrl" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitorsCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("urlId")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "analyticsId" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "visitorIp" TEXT NOT NULL,
    "visitorLocation" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referrer" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("analyticsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_urlId_key" ON "Url"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortenedUrl_key" ON "Url"("shortenedUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_analyticsId_key" ON "Analytics"("analyticsId");

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("urlId") ON DELETE RESTRICT ON UPDATE CASCADE;

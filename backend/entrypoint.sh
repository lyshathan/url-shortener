#!/bin/sh
set -e

echo "Generating Prisma client..."
npx prisma generate

echo "Running migrations..."
npx prisma migrate deploy

echo "Starting application with: npm run $@"
npm run "$@"

#!/bin/sh
set -e

echo "-----------------------"
echo "--- TEST ENTRYPOINT ---"
echo "-----------------------"

echo "Generating Prisma client..."
npx prisma generate

echo "Running migrations..."
npx prisma migrate deploy

echo "Starting application with: npm run $@"
npm run "$@"

echo ""
echo "✅ All tests passed successfully!"
exit 0

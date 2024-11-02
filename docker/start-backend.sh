#!/bin/sh

echo "Waiting for PostgreSQL..."
until PGPASSWORD=development psql -h "db" -U "didis" -d "didis_dev" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up - running migrations..."
npm run migrate

echo "Starting application..."
npm run dev

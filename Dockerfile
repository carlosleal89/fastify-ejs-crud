FROM postgres

COPY ./src/database/01-customers.sql /docker-entrypoint-initdb.d/01-customers.sql

ENV POSTGRES_PASSWORD=123456

EXPOSE 5432

HEALTHCHECK CMD pg_isready -U postgres || exit 1

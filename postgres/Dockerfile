FROM postgres:11.1

ENV POSTGRES_USER root
ENV POSTGRES_PASSWORD 123
ENV POSTGRES_DB taps

COPY base-schema.sql /docker-entrypoint-initdb.d/

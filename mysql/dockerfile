FROM mysql:debian

ENV MYSQL_DATABASE personas
ENV MYSQL_ROOT_PASSWORD root


COPY ./personas.sql /docker-entrypoint-initdb.d/

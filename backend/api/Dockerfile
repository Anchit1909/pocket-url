FROM golang:alpine as builder

RUN mkdir /build

ADD . /build/

WORKDIR /build

RUN go build -o main .

FROM alpine

RUN apk add --no-cache postgresql-client

RUN adduser -S -D -H -h /app appuser

USER appuser

COPY . /app
COPY --from=builder /build/main /app/
COPY init.sql /app/

WORKDIR /app

EXPOSE 3000

CMD ["sh", "-c", "PGPASSWORD=${POSTGRES_PASSWORD} psql -h ${POSTGRES_HOST} -U ${POSTGRES_USER} -d ${POSTGRES_DB} -f /app/init.sql && ./main"]


# === Build Stage ===
FROM node:19 as builder-ui

WORKDIR /app/client

COPY client/package.json client/pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY client .

RUN pnpm run build

# === Final Stage ===
FROM golang:1.21-alpine as builder-go

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY --from=builder-ui /app/client/dist ./client/dist

COPY . .

RUN go build -o console

FROM alpine:latest

WORKDIR /app

COPY --from=builder-go /app/console .
COPY --from=builder-go /app/client/dist ./client/dist

EXPOSE 9595

CMD ["./console"]

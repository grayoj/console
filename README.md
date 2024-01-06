# Console

Virtual infrastructure management control panel and resource management utility in Go with an embedded frontend client written in Vite + Typescript + React. The inspiration
was developing a module to help someone that purchases compute (a virtual machine) to see an overview of their compute resources and monitor by accessing your <ip_address>:9595
The full production version comes preinstalled on virtual machines obtained via Suburban Cloud.

> This is a limited open-sourced version. Things such as power management/action, software installation and killing processes is not included.

## Features

- View disk usage in a graph.
- View system volumes (file system overview)
- View summary of memory usgae.
- Monitor CPU/Memory usage.
- View available networks and connectivity.
- Get an overview of running processes.

## Setup

Without Docker

> You need Node, pnpm and Go installed on your machine to run the project locally outside a tool like Docker.

- Clone the Repository.
- In the console directory, run `go mod download`
- Then switch to the client directory and run `pnpm install && pnpm run build`
- That builds the project into a `dist/*` folder which would be embedded.
- Switch back to the console directory.
- Run `go build -o console`
- To run the compiled binary: `./console`
- The project starts on port :9595, serving the static embedded files.

With Docker

- Clone the repository.
- To build the image, run: `docker build -t console .`
- To run the built image as a container `docker run -p 9595:9595`
- Access on port :9595

> This version works fine on Mac and most Linux systems. Though some linux specific features for both the console and client were excluded.

## Contributions

PR. The best way. Thanks.

# Console Client

This client independently starts on port 5713. It's a Vite + Typescript + React application. This client is embedded into the Console via Go's [embed package](https://pkg.go.dev/embed).

## Features

- React
- Tailwindcss
- Graphs/Charts by Recharts
- Typescript
- pnpm

## Setup

- Clone the root repository, `git clone https://github.com/grayoj/console`
- Change directory to client by running `cd client`
- If you do not have pnpm, run `npm i -g pnpm`.
- Run `pnpm install` to install all dependencies for Console.
- Run the command: `pnpm run dev`

<p align='center'>
  <img src='https://res.cloudinary.com/dmfjsneor/image/upload/v1702992089/skauti_color_cqrkcl.svg' alt='Vitesse - Opinionated Vite Starter Template' width='600'/>
</p>

# Skauti PWA

## About

This is a portal for the Skauti organization. It is built with [Vite](https://vitejs.dev/) and [Vue 3](https://v3.vuejs.org/).

## Features

Creation and managment of businesses.

### Development

#### Stack

- [Vite](https://vitejs.dev/) - Build tooling
- [Vue 3](https://v3.vuejs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [pnpm](https://pnpm.io/) - Package manager
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Code formatter
- [Cypress](https://www.cypress.io/) - E2E testing framework
- [UnoCSS] - Atomic CSS framework
- [Netlify] - Hosting
- [Docker] - Containerization
- [PostgreSQL] - Database

Just run and visit <http://localhost:3333>

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.

### Docker Production Build

First, build the vitesse image by opening the terminal in the project's root directory.

```bash
docker buildx build . -t vitesse:latest
```

Run the image and specify port mapping with the `-p` flag.

```bash
docker run --rm -it -p 8080:80 vitesse:latest
```

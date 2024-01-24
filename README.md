## Multibuzzer

Simple multiplayer buzzer system

https://multibuzz.app

Built using Create React App and boardgame.io

Please open an issue if you experience a bug or have product feedback!

### Development

- Prerequisites: node and a package manager (e.g. npm, yarn)
- Run `npm install` to install dependencies
- Run `npm run dev` to run local client on localhost:4000 and local server on localhost:4001

### Deployment

- Build React app using `npm run build`
- Run `npm run server` to run the Koa server, which will serve the built React app (via '/build'), as well as operate both the boardgame.io server and lobby

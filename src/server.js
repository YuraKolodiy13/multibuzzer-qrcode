import path from 'path';
import serve from 'koa-static';
import ratelimit from 'koa-ratelimit';
import { v4 as uuidv4 } from 'uuid';

const Server = require('boardgame.io/server').Server;
const Buzzer = require('./lib/store').Buzzer;
const server = Server({ games: [Buzzer], generateCredentials: () => uuidv4() });

const PORT = process.env.PORT || 4001;
const { app } = server;

function randomString(length, chars) {
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

app.use(async (ctx, next) => {
  // CORS headers
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

// rate limiter
const db = new Map();
app.use(
  ratelimit({
    driver: 'memory',
    db: db,
    duration: 60000,
    errorMessage: 'Too many requests',
    id: (ctx) => ctx.ip,
    max: 25,
    whitelist: (ctx) => {
      return !ctx.path.includes(`games/${Buzzer.name}`);
    },
  })
);

// URL rewriting middleware
app.use(async (ctx, next) => {
  // Define your rewrite rules here
  const rewriteRules = [
    { from: /^\/api\/(.*)/, to: '/$1' },
    // Add more rules as needed
  ];

  for (const rule of rewriteRules) {
    const match = ctx.path.match(rule.from);
    if (match) {
      ctx.path = rule.to.replace(/\$(\d+)/g, (_, index) => match[index]);
      break;
    }
  }

  await next();
});

// Serve static files
app.use(serve(path.join(__dirname, '../build')));

server.run({
  port: PORT,
  lobbyConfig: { uuid: () => randomString(6, 'ABCDEFGHJKLMNPQRSTUVWXYZ') },
});
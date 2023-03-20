// Middlewares
import { Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

const isDev = process.env.NODE_ENV === 'development';

const epicMiddleware = createEpicMiddleware();

const middleware: Middleware[] = [epicMiddleware];

isDev &&
  middleware.push(
    createLogger({
      duration: true,
      collapsed: true,
      colors: {
        title: () => '#139BFE',
        prevState: () => '#1C5FAF',
        action: () => '#149945',
        nextState: () => '#A47104',
        error: () => '#ff0005',
      },
    })
  );

export { middleware, epicMiddleware };

// Core
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import togglers from './client/togglers';
import messages from './messages/slice';

// Middleware
import { middleware } from './middleware';

export const store = configureStore({
  reducer: {
    togglers,
    messages,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

// epicMiddleware.run();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

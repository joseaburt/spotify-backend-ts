import ExpressServer from '../../infrastructure/server/express-server';

export const server = new ExpressServer();
export const app = server.getApp();

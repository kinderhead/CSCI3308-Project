import { dynamic_private_env as env } from '../config.js';

export const POSTGRES_USER = env.POSTGRES_USER;
export const POSTGRES_PASSWORD = env.POSTGRES_PASSWORD;
export const POSTGRES_DB = env.POSTGRES_DB;
export const NODE_ENV = env.NODE_ENV;
export const SESSION_SECRET = env.SESSION_SECRET;
export const BASE64_KEY = env.BASE64_KEY;

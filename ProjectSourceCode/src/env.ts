import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
    POSTGRES_USER: {},
    POSTGRES_PASSWORD: {},
    POSTGRES_DB: {},
    NODE_ENV: {},
    SESSION_SECRET: {},
    BASE64_KEY: {}
});

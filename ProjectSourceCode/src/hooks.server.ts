import type { Handle } from '@sveltejs/kit/hooks';
import { createHash } from 'node:crypto';
import { getUserBySessionHash } from '#lib/server/db.js';

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('session_token');

    event.locals.user = null;

    if (token) {
        const tokenHash = createHash('sha256').update(token).digest('hex');
        const user = await getUserBySessionHash(tokenHash);

        if (user) {
            event.locals.user = user;
        } else {
            
            event.cookies.delete('session_token', { path: '/' });
        }
    }

    return resolve(event);
};
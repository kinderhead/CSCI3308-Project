
import { db } from '#lib/server/db.js';
import { createHash } from 'node:crypto';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {

    const token = cookies.get('session_token');

    if (token && /^[0-9a-f]{64}$/.test(token)) {

        // Hash the token to match the database
        const tokenHash = createHash('sha256')
            .update(token)
            .digest('hex');

        await db.none(
            'DELETE FROM sessions WHERE token_hash = $1',
            [tokenHash]
        );
    }

    cookies.delete('session_token', {
        path: '/'
    });

    redirect(303, '/login');
};

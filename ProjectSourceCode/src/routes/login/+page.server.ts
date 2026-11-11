import { createSession, getUserByEmail } from '#lib/server/db.js';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'node:crypto';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    // optional: redirect to '/' if already logged in
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
            return fail(400, { error: 'Email and password are required.', email: String(email ?? '') });
        }

        const user = await getUserByEmail(email.trim());

        const valid = user ? await bcrypt.compare(password, user.password) : false;
        if (!user || !valid) {
            return fail(401, { error: 'Invalid email or password.', email });
        }

        const token = randomBytes(32).toString('hex');
        const tokenHash = createHash('sha256').update(token).digest('hex');
        const maxAge = 60 * 60 * 24 * 7; // 7 days

        await createSession({
            email: user.email,
            tokenHash,
            expiresAt: new Date(Date.now() + maxAge * 1000)
        });

        cookies.set('session_token', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge
        });

        redirect(303, '/');
    }
} satisfies Actions;
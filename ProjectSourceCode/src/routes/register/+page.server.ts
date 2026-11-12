import { createUser } from '#lib/server/db.js';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import type { Actions, PageServerLoad } from './$types';
import { validateRegistration } from '#lib/validateRegistration.js';

export const load = (async () => {
    // optional: redirect to '/' if already logged in
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirm_password');

        if (
            typeof name !== 'string' ||
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            typeof confirmPassword !== 'string'
        ) {
            return fail(400, { error: 'Invalid form submission.' });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const values = { name: cleanName, email: cleanEmail };

        if (!cleanName || !cleanEmail || !password) {
            return fail(400, { error: 'All fields are required.', ...values });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            return fail(400, { error: 'Please enter a valid email address.', ...values });
        }
        if (!validateRegistration({ password })) {
            return fail(400, { error: 'Password must be at least 8 characters.', ...values });
        }
        if (Buffer.byteLength(password) > 72) {
            return fail(400, { error: 'Password is too long (72 bytes max).', ...values });
        }
        if (password !== confirmPassword) {
            return fail(400, { error: 'Passwords do not match.', ...values });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        try {
            await createUser({ email: cleanEmail, name: cleanName, passwordHash });
        } catch (err: any) {
            if (err?.code === '23505') {
                return fail(409, { error: 'An account with that email already exists.', ...values });
            }
            throw err;
        }

        redirect(303, '/login');
    }
} satisfies Actions;
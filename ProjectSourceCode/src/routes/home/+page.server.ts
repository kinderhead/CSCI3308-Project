import { requireAuth } from '#lib/server/auth.ts';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    requireAuth();
}) satisfies PageServerLoad;

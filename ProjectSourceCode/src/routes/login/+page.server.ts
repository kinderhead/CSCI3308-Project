import type { Actions, PageServerLoad } from './$types';

export const actions = {
    default: async (event) => {
        let data = await event.request.formData();
        console.log(data.get("username"));
        console.log(data.get("password"));

        event.cookies.set("session_token", "dfkghsdhfjgshjdf");
    }
} satisfies Actions;

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;
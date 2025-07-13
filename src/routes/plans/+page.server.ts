import serverFetchAPI from '$lib/functions/serverFetchAPI.js';

export const load = async ({ cookies, locals }) => {
    const session = await locals.auth();

    const res = await serverFetchAPI({ path: "/api/subscriptions/plans", cookies })
        .then(res => res.json())

    return {
        plans: res.result,
        session: session,
        error: res.error,
    }
};

import serverFetchAPI from '$lib/functions/serverFetchAPI.js';

export const load = async ({ cookies }) => {
    const res = await serverFetchAPI({ path: "/api/subscriptions/plans", cookies })
        .then(res => res.json())

    return {
        plans: res.result,
        error: res.error
    }
};

import clientFetchAPI from "$lib/functions/clientFetchAPI";

type UserDataState = {
    user: User | null;
    isFetching: boolean;
    isFetched: boolean;
    error: string;
    refetchUser: () => void;
}

const userDataState = $state<UserDataState>({
    user: null,
    isFetching: false,
    isFetched: false,
    error: "",
    refetchUser: () => { },
});

function fetchUserData() {
    userDataState.isFetching = true
    clientFetchAPI({ path: "/api/users" })
        .then((user) => {
            userDataState.user = user as User;
            userDataState.isFetched = true;
            userDataState.error = "";
        })
        .catch((error) => {
            userDataState.error = error;
            userDataState.isFetched = false;
        })
        .finally(() => {
            userDataState.isFetching = false
        })
}

export { userDataState, fetchUserData }
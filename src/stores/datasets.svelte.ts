import clientFetchAPI from "$lib/functions/clientFetchAPI";

type DatasetsState = {
    datasets: Dataset[];
    fetching: boolean;
    fetched: boolean;
    error: string;
}

const datasetsState = $state<DatasetsState>({
    datasets: [],
    fetching: false,
    fetched: false,
    error: "",
});

function fetchDatasets() {
    if (!datasetsState.fetched && !datasetsState.fetching) {
        datasetsState.fetching = true
        clientFetchAPI<Dataset[]>({ path: "/api/datasets" })
            .then((datasets) => {
                datasetsState.datasets = datasets;
                datasetsState.fetched = true;
                datasetsState.error = "";
            })
            .catch((error) => {
                datasetsState.error = error;
                datasetsState.fetched = false;
            })
            .finally(() => {
                datasetsState.fetching = false
            })
    }
}

export { datasetsState, fetchDatasets }
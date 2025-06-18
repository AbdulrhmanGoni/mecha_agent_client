import clientFetchAPI from "$lib/functions/clientFetchAPI";

type DatasetPageState = {
    dataset: DatasetFullData | null;
    isFetching: boolean;
    isFetched: boolean;
    error: string;
}

const defaultDatasetPageState = {
    dataset: null,
    isFetching: false,
    isFetched: false,
    error: "",
}

const datasetPageState = $state<DatasetPageState>(defaultDatasetPageState);

function fetchDataset(datasetId: string) {
    if (datasetPageState.dataset?.id !== datasetId) {
        datasetPageState.isFetching = true
        clientFetchAPI<DatasetFullData>({ path: "/api/datasets/" + datasetId })
            .then((dataset) => {
                datasetPageState.dataset = dataset;
                datasetPageState.isFetched = true;
                datasetPageState.error = "";
            })
            .catch((error) => {
                datasetPageState.error = error;
                datasetPageState.isFetched = false;
            })
            .finally(() => {
                datasetPageState.isFetching = false
            })
    }
}

function resetDatasetPageState() {
    Object.assign(datasetPageState, defaultDatasetPageState)
}

export {
    datasetPageState,
    fetchDataset,
    resetDatasetPageState,
}
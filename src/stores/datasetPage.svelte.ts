import clientFetchAPI from "$lib/functions/clientFetchAPI";

type DatasetPageState = {
    dataset: DatasetFullData | null;
    isFetching: boolean;
    isFetched: boolean;
    error: string;
}

type DatasetInstructionsState = {
    instructions: Instruction[];
    selectedInstruction: Instruction | null,
    fetching: boolean;
    fetched: boolean;
    error: string;
    openAddInstructionsForm: boolean;
    openEditInstructionsForm: boolean;
    page: number;
    pageSize: number;
    search: string;
}

const defaultDatasetPageState = {
    dataset: null,
    isFetching: false,
    isFetched: false,
    error: "",
}

const datasetPageState = $state<DatasetPageState>(defaultDatasetPageState);

const defaultDatasetInstructionsState = {
    instructions: [],
    selectedInstruction: null,
    fetching: false,
    fetched: false,
    error: "",
    openAddInstructionsForm: false,
    openEditInstructionsForm: false,
    page: 0,
    pageSize: 20,
    search: "",
}

const datasetInstructionsState = $state<DatasetInstructionsState>(defaultDatasetInstructionsState);

function fetchDataset(datasetId: string) {
    if (datasetPageState.dataset?.id !== datasetId) {
        if (datasetPageState.dataset) {
            datasetPageState.dataset = null
        }

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

function fetchDatasetInstructions(datasetId: string) {
    datasetInstructionsState.fetching = true

    const pageSize = datasetInstructionsState.pageSize;
    const pageNumber = datasetInstructionsState.page;

    const searchQuery = new URLSearchParams([
        ["datasetId", datasetId],
        ["page", String(pageNumber)],
        ["pageSize", String(pageSize)],
        ["searchText", datasetInstructionsState.search],
    ])

    clientFetchAPI<Instruction[]>({ path: "/api/instructions?" + searchQuery.toString() })
        .then((instructions) => {
            datasetInstructionsState.instructions = instructions;
            datasetInstructionsState.fetched = true;
            datasetInstructionsState.error = "";
        })
        .catch((error) => {
            datasetInstructionsState.error = error;
            datasetInstructionsState.fetched = false;
        })
        .finally(() => {
            datasetInstructionsState.fetching = false
        })
}

function resetDatasetPageState() {
    Object.assign(datasetInstructionsState, defaultDatasetInstructionsState)
}

export {
    datasetPageState,
    fetchDataset,
    datasetInstructionsState,
    fetchDatasetInstructions,
    resetDatasetPageState,
}
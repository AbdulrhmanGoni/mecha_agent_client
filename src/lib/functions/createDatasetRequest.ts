import clientFetchAPI from "./clientFetchAPI";

export default async function createDatasetRequest(datasetFormData: FormData) {
    return clientFetchAPI<Dataset>({
        path: `/api/datasets`,
        method: "POST",
        body: datasetFormData,
        successStatusCode: 201
    })
};

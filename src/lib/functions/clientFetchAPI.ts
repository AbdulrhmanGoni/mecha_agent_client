type ClientFetchAPIOption = {
    path: string;
    method?: string;
    body?: any;
    successStatusCode?: number
}

export default async function clientFetchAPI<DataT>(options: ClientFetchAPIOption) {
    const response = await fetch(options.path, {
        method: options.method || "GET",
        body: options.body && JSON.stringify(options.body)
    })

    const res = await response.json();

    if (response.status === (options.successStatusCode || 200)) {
        return res.result as DataT
    } else {
        throw (res.error || "Unexpected internal server error !")
    }
};

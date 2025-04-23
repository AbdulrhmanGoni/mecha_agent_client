import mediaURL from "./mediaURL";

export default async function downloadDatasetRequest(datasetId: string) {
    const path = mediaURL.datasets(datasetId);
    if (path) {
        const response = await fetch(path)

        const url = window.URL.createObjectURL(
            new Blob(
                [await response.blob()],
                { type: response.headers.get("Content-Type") || "text/plain" }
            )
        );

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', datasetId);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
};

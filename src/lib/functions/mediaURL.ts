type MediaId = string | null | undefined

function formURL(scope: string, id: MediaId): string | undefined {
    return id ? `/api/media/${scope}/${id}` : undefined
};

const mediaURL = {
    agentsAvatars: (id: MediaId) => formURL("agents-avatars", id),
    datasets: (id: MediaId) => formURL("datasets", id),
}

export default mediaURL
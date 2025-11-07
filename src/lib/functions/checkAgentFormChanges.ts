export default function checkAgentFormChanges(agent: Agent, form: HTMLFormElement) {
    const formData = new FormData(form);
    const updatedData: Record<string, string | boolean> = {}
    let isUpdated = false

    formData.forEach((value, key) => {
        if (key == 'removeAvatar') {
            if (value === "on") {
                updatedData["removeAvatar"] = true
                if (!isUpdated) isUpdated = true
            }
            return
        }

        const oldValue = agent[key as keyof Agent] || "";
        const newValue = value.toString() || "";
        if (newValue !== oldValue) {
            updatedData[key] = newValue
            if (!isUpdated) isUpdated = true
        }
    })

    return {
        updatedData,
        isUpdated
    }
}


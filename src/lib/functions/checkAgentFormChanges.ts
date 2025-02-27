export default function checkAgentFormChanges(agent: Agent, form: HTMLFormElement) {
    const formData = new FormData(form);
    const updatedData = new FormData();
    let isUpdated = false

    formData.forEach((value, key) => {
        if (key === 'avatar') {
            const avatar = formData.get('avatar') as File;
            if (avatar.size && avatar.name) {
                updatedData.set("avatar", avatar)
                if (!isUpdated) isUpdated = true
            }
            return
        }
        if (key === 'removeAvatar') {
            if (value === "on") {
                updatedData.set("removeAvatar", "true")
                if (!isUpdated) isUpdated = true
            }
            return
        }

        const oldValue = agent[key as keyof Agent] || "";
        const newValue = value.toString() || "";
        if (newValue !== oldValue) {
            updatedData.set(key, value)
            if (!isUpdated) isUpdated = true
        }
    })

    return {
        updatedData,
        isUpdated
    }
}


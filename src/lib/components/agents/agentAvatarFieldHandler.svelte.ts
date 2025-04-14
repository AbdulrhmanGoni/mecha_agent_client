import { writable } from "svelte/store";

export default function agentAvatarFieldHandler(hasAvatar: boolean) {
    const avatarRemoved = writable(false);
    const selectedAvatar = writable<string | ArrayBuffer | null>(null);
    const allowedImagesTypes = ['svg+xml', 'png', 'jpeg', 'webp'];

    function onAvatarSelect(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
        const avatarFile = e.currentTarget.files?.[0];
        if (avatarFile) {
            if (allowedImagesTypes.some((type) => avatarFile?.type.slice(6) === type)) {
                const reader = new FileReader();
                reader.readAsDataURL(avatarFile);
                reader.onload = () => {
                    selectedAvatar.set(reader.result);
                };
                undoAvatarRemoving();
            } else {
                const agentAvatar = document.getElementById('agent-avatar') as HTMLInputElement;
                agentAvatar!.value = '';
                selectedAvatar.set(null);
            }
        } else {
            selectedAvatar.set(null);
        }
    }

    function setRemoveAvatarState(state: boolean) {
        avatarRemoved.set(state)
        const avatarRemovedCheckbox = document.getElementById(
            'avatar-removed'
        ) as HTMLInputElement | null;
        if (avatarRemovedCheckbox) avatarRemovedCheckbox.checked = state;
    }

    function onAvatarRemoving() {
        const agentAvatar = document.getElementById('agent-avatar') as HTMLInputElement;
        agentAvatar!.value = '';
        selectedAvatar.set(null);

        if (hasAvatar) {
            setRemoveAvatarState(true);
        }
    }

    function undoAvatarRemoving() {
        setRemoveAvatarState(false);
    }

    return {
        onAvatarSelect,
        onAvatarRemoving,
        undoAvatarRemoving,
        selectedAvatar,
        avatarRemoved,
    }
};
